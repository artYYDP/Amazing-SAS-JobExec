# Utilizando o Job Execution como Fluxo de Trabalho

Sabe aquele código que você precisa executar todos os dias para carregar dados na memória do SAS? Ou então aquela sequência de arquivos `.sas` que precisam rodar em uma ordem específica para que o processo funcione corretamente?

Com o SAS Job Execution, é possível transformar esses processos em fluxos automatizados, organizados e agendáveis.

## 📌 O que você pode fazer?

- Executar rotinas SAS automaticamente via agendamento
- Encadear arquivos `.sas` como etapas ordenadas
- Evitar a abertura manual do SAS Studio todos os dias
- Padronizar execuções em ambientes corporativos

## 🔄 Como construir o fluxo?

Você pode montar seu fluxo de trabalho de duas formas:

### 1. Criar um Job diretamente no ambiente SAS

Crie um Job no SAS Environment Manager ou diretamente na interface do SAS Studio ou até mesmo no ambiente do SAS Job Execution[^1]. Embora essa seja uma alternativa válida, não entrarei em detalhes aqui, pois não é o método que costumo utilizar no meu dia a dia.

### 2. Transformar um arquivo `.sas` em Job agendável

No SAS Studio, qualquer arquivo `.sas` pode ser transformado em um Job com agendamento. Basta clicar nos três pontos da lateral direita superior do código no SAS Studio e depois em `Schedule as a job`.

![Imagem exemplo 01](/images/fluxo/01.png)

Isso abre a interface de agendamento, onde você define horários, recorrência e parâmetros.

![Imagem exemplo 02](/images/fluxo/02.png)

> [!TIP]
> Ao usar Jobs construídos a partir de arquivos `.sas`, você pode versionar esse processo no GitHub e até usar automações para executar jobs diretamente a partir de repositórios no **GitHub** — mas isso é assunto para outro momento. 😉

#### Exemplo de fluxo encadeado

O exemplo a seguir mostra como organizar a execução de múltiplos scripts SAS usando macros, arquivos em pastas e chamadas %include.

Você terá um arquivo principal responsável por orquestrar a execução dos steps:

```sas
/* Script de Schedule no SAS */

/* Define a macro para inclusão dos arquivos */
%macro incluirArquivo(step, folder, filename);
  %let folder = &folder;
  %let step = &step;
  %let filename = &filename;

  filename &step filesrvc
    folderpath="&folder."
    filename="&filename"
    debug=http;
  %include &step;
%mend incluirArquivo;

/* Definição dos arquivos */
%let step = step01;
%let folder = /Projects/{nome_do_projeto}/{pasta_de_códigos}/;
%let filename = {nome_do_arquivo_01_sas}.sas;
%incluirArquivo(&step, &folder, &filename);

%let step = step02;
%let filename = {nome_do_arquivo_02_sas}.sas;
%incluirArquivo(&step, &folder, &filename);

%let step = step03;
%let filename = {nome_do_arquivo_03_sas}.sas;
%incluirArquivo(&step, &folder, &filename);

/* Fim do script */
```

Esse arquivo principal se torna seu Job agendável.

## ✅ Benefícios

- Automatização de rotinas complexas
- Redução de erros operacionais
- Execuções padronizadas e auditáveis
- Integração com controle de versão (GitHub)

[^1]: [Scheduling a Job](https://documentation.sas.com/doc/en/jobexeccdc/v_004/jobexecug/n1gt4ch06ktkzbn1qis2t6zislpv.htm)