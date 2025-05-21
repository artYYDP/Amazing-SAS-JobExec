# Utilizando o Job Execution como API

O SAS Job Execution Web Application permite transformar códigos SAS em endpoints de API. Isso significa que você pode criar uma lógica de negócio dentro do SAS e disponibilizá-la para consumo por outras aplicações por meio de uma requisição HTTP.

Esse recurso é extremamente útil para integrar o SAS a outros sistemas, front-ends, ferramentas de visualização ou processos automatizados.

## 🧩 Estrutura da API

Para que um Job funcione como uma API, é necessário que ele siga algumas boas práticas:

- Use o parâmetro `out=_webout` para retornar conteúdo pela requisição HTTP
- Defina o tipo de saída esperada com o parâmetro `_output_type` (ex: JSON, HTML, XML...)
- Evite logs excessivos no retorno (não retorne PROC PRINT ou resultados padrão do SAS)
- Retorne dados estruturados (ex: JSON)

## 🔧 Parâmetros Principais

| Parâmetro | Local | Descrição |
| --------- | ----- | --------- |
| out=_webout | No código | Define que a saída será entregue no corpo da resposta HTTP |
| _output_type= | No parâmetro | Define o tipo de retorno: json, html, text, csv, etc. |

## 📦 Exemplo de Código SAS como API

### 📌 Exemplo 1

O exemplo abaixo executa uma consulta em uma tabela do SAS e retorna os dados em formato JSON, ideal para consumo em sistemas externos:

```sas
/* Conecta ao CAS */
cas casauto;
caslib _all_ assign;

/* Query de consulta à tabela */
proc sql noprint;
  create table work.resultado as
  select
    CD_IBGE as label,
    upcase(NM_MUN) as value
  from PUBLIC.MUNICIPIOS
  order by NM_MUN asc;
quit;

/* Exporta como JSON */
proc json out=_webout nosastags pretty;
  export work.resultado;
run;

/* Finaliza sessão */
cas casauto terminate;
```

Adicionamos os parâmetros necessários para que o retorno fosse possível, de acordo com o código SAS:

![IMG01](/images/api/01.png)

Esse retorno pode ser facilmente consumido por um front-end em **JavaScript**, uma **aplicação em Python** ou qualquer outro sistema que consuma **APIs RESTful**.

### 📌 Exemplo 2

Abaixo segue um exemplo de consulta e retorno utilizando parâmetros de pesquisa passados na URL:

```sas
/* Conecta ao CAS */
cas casauto;
caslib _all_ assign;

/* Query de consulta à tabela */
proc sql noprint;
  create table work.resultado as
  select
    CD_IBGE as label,
    upcase(NM_MUN) as value
  from PUBLIC.MUNICIPIOS
  where CD_UF = upcase("&uf")
  order by NM_MUN asc;
quit;

/* Exporta como JSON */
proc json out=_webout nosastags pretty;
  export work.resultado;
run;

/* Finaliza sessão */
cas casauto terminate;
```

![IMG02](/images/api/02.png)

Adicione o parâmetro no final da URL do SAS Job Execution:

![IMG03](/images/api/03.png)

Para exemplificar, colocamos o parâmetro `&uf=ES` de modo que só retorne no JSON cidades do Estado do Espírito Santo. Esse é o resultado:

![IMG04](/images/api/04.png)

## ✅ Dicas importantes

- Evite códigos que geram múltiplas saídas e sempre coloque a opção `noprint` quando disponível.
- Teste seu Job no navegador com _output_type=json antes de integrá-lo.
- Use macros para validar parâmetros de entrada e tratar erros (evita quebra inesperada da API).
- Se quiser que seu Job aceite parâmetros da requisição, use &nome_parametro no SAS e passe o parâmetro via URL[^1].

[^1]: [Passing User Input to a Job Using the Query String](documentation.sas.com/doc/en/jobexeccdc/v_004/jobexecug/n1c1nbeo2i1lhgn1ut1yuqz5ykqa.htm)