# Regras de Uso - SAS Job Execution Web Application

Este repositório reúne boas práticas e requisitos técnicos para desenvolvimento de aplicações com o SAS Job Execution Web Application, visando segurança, compatibilidade e padronização em ambientes corporativos.

## ✅ Requisitos para execução

### 1. Ambiente com HTTPS e certificado válido

- O ambiente de execução precisa obrigatoriamente estar sob um domínio com certificado SSL/TLS válido.

### 2. Uso de HTML, CSS e JavaScript puros

- Recomenda-se o uso de tecnologias padrão (JavaScript (Vanilla), CSS3 e HTML5).
- Alguns frameworks podem ser utilizados desde que embutidos localmente (ver item 3).

### 3. CDNs Externas não são permitidas (restrição de segurança)

- Em ambientes com SAS Job Execution Services (JES), não é permitido o uso de links externos (CDN, fonts, bibliotecas).
- **Solução:** baixe os arquivos JS e CSS e referencie-os localmente no job (ver item 4).

### 4. Referenciar arquivos localmente

- A estrutura de caminhos no SAS não segue a convenção tradicional de desenvolvimento web. Não é possível referenciar arquivos apenas pelo nome ou caminho relativo como abaixo:

```html
<script src="script.js"></script>
<link rel="stylesheet" href="style.css">
```

- **Solução:** é necessário utilizar a **URI** gerada pelo SAS e adicionar o `/content` no final do arquivo. Exemplo:

```html
<script src="/file/file/{URI}/content"></script>
<link rel="stylesheet" href="/file/file/{URI}/content">
```

> [!TIP]
> Caso você não saiba como obter a URI de um arquivo, [clique aqui (em breve)](about:blank) para acessar o tutorial completo!

### 5. Lógica de validação e rastreamento

- Sempre valide os parâmetros recebidos pelo job, principalmente quando enviados via interface HTML/JS.
- Utilize logs e mensagens com %put para rastreamento durante a execução.
- Crie macros para capturar e tratar erros no fluxo de execução SAS.

### 6. Configurações de Ambiente SAS

Ao decorrer de vários desenvolvimentos que fiz, verifiquei que há uma certa padronização a ser feita para rodas o **SAS Job Execution** sem problemas no ambiente. Essas modificações são:

#### Configuração no SAS Visual Analytics

- Acesse o ambiente **SAS Provider** (não pode ser *tenant*).
- Entre no microserviço **SAS® Environment Manager**.
- Vá em **Configuração**, depois em **Exibir**, clique em **Definições**.
- Selecione em filtro o termo **sas.visualanalytics**.
- Edite a opção **IFrame Sandbox Attribute Value** e acrescente os seguintes comandos:

```plaintext
allow-scripts allow-downloads allow-popups allow-modals
```

Essa configuração permitirá que você possa executar o **SAS JE** dentro do **SAS VA**.

#### Configuração para CSS e JS no SAS Job Execution

- Acesse o ambiente **SAS Provider** (não pode ser *tenant*).
- Acesse o **SAS® Environment Manager**.
- Vá em **Configuração**, depois em **Exibir**, clique em **Definições**.
- Selecione em filtro o termo **sas.commons.web.security**.
- Edite a opção **Files service**, vá na configuração **content-security-policy** e deixe dessa forma:

```plaintext
default-src *; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src * blob: data:; child-src * blob: data: mailto:;frame-src * blob: data: mailto:;
```

- Faça o mesmo nas opções **SAS Drive**, **SAS Visual Analytics** e **SAS Visual Investigator**.

Essa configuração permite que o **SAS JE** execute arquivos CSS e JS.