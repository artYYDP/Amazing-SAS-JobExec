# Utilizando o SAS Job Execution como Interface

O SAS Job Execution Web Application também permite que você crie interfaces web interativas que se conectam diretamente aos códigos SAS — tudo isso com HTML, CSS e JavaScript puro. Essa abordagem transforma o SAS em uma verdadeira plataforma de aplicações, oferecendo uma experiência visual customizada para o usuário final.

## 🌐 Organização dos Arquivos

Ao criar uma interface no SAS Job Execution Web Application, siga essa lógica de estrutura:

- **HTML principal**: define a estrutura da tela (elementos visuais, iframes, botões etc.)
- **CSS e JS embutidos inicialmente**: ideal para testes rápidos e manutenções durante o desenvolvimento
- **Versão final**: mova o CSS e o JS para arquivos separados (Jobs do tipo texto), e referencie-os via URI

Essa abordagem incremental favorece o versionamento, reaproveitamento e manutenção do código.

## 📎 Referência de Arquivos Estáticos

Por questões de segurança, o **SAS Viya 3.5** não permite conexão com recursos externos via CDN. Isso inclui bibliotecas como Bootstrap, jQuery, fontes do Google, ícones, imagens etc. Para contornar isso:

- Baixe os arquivos localmente
- Suba-os para a área de arquivos utilizando o **SAS Drive (obrigatório)**
- Copie o link URI do arquivo (tutorial em breve)
- Use esse link no seu HTML (em `src` ou `href`) adicionando `/content` no final da URL

Exemplo:

```html
<link rel="stylesheet" href="/files/files/1234abcd-9876-.../content">
<script src="/files/files/5627257a-73bc-4f06-936.../content"></script>
```

> [!CAUTION]
> Isso vale para imagens (JPG, PNG, SVG), fontes, ícones (.ico) e qualquer outro recurso estático.

## 🖼️ Conteúdo dinâmico via iframe

Recomenda-se o uso de iframes para carregar conteúdo interno como relatórios do Visual Analytics, dashboards ou até outros jobs HTML.

Exemplo básico:

```html
<iframe
  id="contentFrame"
  name="contentFrame"
  src="https://meu-servidor/SASVisualAnalytics/?reportUri=/reports/path&appSwitcherDisabled=true"
  scrolling="no"
  frameborder="0"
  >
</iframe>
```

- O parâmetro **`&appSwitcherDisabled=true`** é obrigatório. Ele evita que o VA redirecione o usuário para a tela de escolha de aplicações. Sem esse parâmetro, o link do `report` não funcionará[^1].
- É possível usar múltiplos iframes em uma única página, cada um com um gráfico, relatório ou outro conteúdo VA.

## 🧠 Boas práticas

- Use estilos visuais baseados nas cores da identidade da projeto que está trabalhando.
- Nomeie seus elementos com lógica e clareza (ex: id="grafico-gastos", class="botao-verde")
- Prefira vanilla JS ao invés de frameworks, já que não é possível importar bibliotecas externas via CDN
- Crie uma pasta ou estrutura de Jobs somente para arquivos HTML, CSS e JS para facilitar manutenção futura

[^1]: [Using URL Parameters to View a Report](https://documentation.sas.com/doc/en/vacdc/v_031/vavwr/p0l4zt68r3id4wn1fk3y3kconfg4.htm)