%global nome;
%global cpf;
%global dt_nasc;

%let table_name = TESTE; /* Define o nome da tabela temporária */
%let table_final = CONVERT_LISTA; /* Define o nome da tabela temporária */
%let incaslib = PUBLIC; /* Define o nome da CASLIB */

/* Incluir dados Globais na tabela temporária */
data &table_name;

		/* Declare as variáveis como explicitamente do tipo correto */
    length nome $255 cpf $14 dt_nasc 8;

    /* Converte a string de data para um tipo de dado DATE e TIME */
		dt_nasc = input("&dt_nasc", yymmdd10.);

    /* Aplica o formato DD/MM/YYYY à variável DATE e TIME */
		format dt_nasc ddmmyy10.;

    /* Outras variáveis */
    nome = upcase("&nome");
    cpf = "&cpf";
run;

/* Cria uma macro para validação */
%macro validacao;
	/* Declara a variável code como global */
	%global code;

	/* Conecte-se ao CAS */
  cas casauto;
  caslib _all_ assign;
  options casdatalimit=all;

	/* Verifica se a tabela final já existe */
    proc sql noprint;
      select count(*) into :tabela_existe
      from dictionary.tables
      where libname = 'PUBLIC' and memname = upcase("&table_final.");
    quit;

    /* Se a tabela existir, verifica se o CPF já está cadastrado */
    %if &tabela_existe > 0 %then %do;
      /* Verifica se o CPF já está na tabela */
      proc sql noprint;
        select count(*) into :cpf_existe
        from PUBLIC.&table_final
        where cpf = "&cpf";
      quit;

      /* Se o CPF já existir, retorna erro 300 */
      %if &cpf_existe > 0 %then %do;
        %let code = 300;
      %end;
      /* Se o CPF não existir, retorna código 200 e faz o append */
      %else %do;
        %let code = 200;

        /* Faz o append da nova tabela */
        proc casutil;
          load data=&table_name casout="&table_final" outcaslib="PUBLIC" append;
        quit;

      %end;
    %end;

    /* Se a tabela não existir, cria uma nova tabela e promove para o PUBLIC */
    %else %do;
      %let code = 200;

      /* Carrega a nova tabela para o CAS */
      proc casutil;
        load data=&table_name casout="&table_name" outcaslib=Public replace;
      quit;

      /* Promove a tabela para o CASLIB */
      proc casutil;
        promote incaslib="PUBLIC" casdata="&table_name" outcaslib="PUBLIC" casout="&table_final";
      quit;

    %end;

    /* Se algum erro ocorrer, retorna o código 400 */
    %if &code = %str() %then %do;
      %let code = 400;
    %end;
	/* Termina a sessão CAS */
  cas casauto terminate;
%mend validacao;

/* Executa a macro */
%validacao;

/* Resultado para a página HTML */
data resultado;
    length message $100 text $200;
    if &code = 200 then do;
      message = "Cadastrado com sucesso";
      code = 200;
      text = "Novo cadastro adicionado à lista.";
    end;
    else if &code = 300 then do;
      message = "CPF já cadastrado";
      code = 300;
      text = "O CPF informado já existe na base de dados.";
    end;
    else do;
      message = "Falha ao cadastrar";
      code = 400;
      text = "Verifique as informações e tente novamente.";
    end;
run;

/* Exporta o resultado para o HTML */
proc json out=_webout nosastags pretty;
  export resultado;
run;