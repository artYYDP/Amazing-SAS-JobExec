# Using SAS Job Execution as an Interface

The SAS Job Execution Web Application also allows you to build interactive web interfaces that connect directly to your SAS code — all using plain HTML, CSS, and JavaScript. This approach turns SAS into a true application platform, offering a customized visual experience for the end user.

## 🌐 File Organization

When creating an interface in the SAS Job Execution Web Application, follow this file structure logic:

- **Main HTML**: defines the screen layout (visual elements, iframes, buttons, etc.)
- **Inline CSS and JS (initially)**: ideal for quick testing and development
- **Final version**: move CSS and JS to separate files (text-based Jobs), and reference them via URI

This incremental approach encourages version control, code reuse, and easier maintenance.

## 📎 Referencing Static Files

For security reasons, **SAS Viya 3.5** does not allow connections to external resources via CDN. This includes libraries like Bootstrap, jQuery, Google Fonts, icons, images, etc. To work around this:

- Download the files locally
- Upload them using **SAS Drive** (mandatory)
- Copy the file’s URI link (tutorial coming soon)
- Use that link in your HTML (`src` or `href`), appending `/content` at the end of the URL

Example:

```html
<link rel="stylesheet" href="/files/files/1234abcd-9876-.../content">
<script src="/files/files/5627257a-73bc-4f06-936.../content"></script>
```

> [!CAUTION]
> This applies to images (JPG, PNG, SVG), fonts, icons (.ico), and any other static resources.

## 🖼️ Dynamic Content via iframe

Using iframes is recommended to load internal content such as Visual Analytics reports, dashboards, or even other HTML jobs.

Basic example:

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

- The **`&appSwitcherDisabled=true`** parameter is mandatory. It prevents VA from redirecting the user to the application selection screen. Without this parameter, the `report` link will not work[^1].
- You can use multiple iframes on a single page, each with a chart, report, or other VA content.

## 🧠 Best Practices

- Use visual styles based on the branding colors of the project you’re working on.
- Name your elements with logic and clarity (e.g., `id="spending-chart"`, `class="green-button"`)
- Prefer vanilla JS instead of frameworks, since it's not possible to import external libraries via CDN
- Create a dedicated folder or job structure specifically for your HTML, CSS, and JS files to simplify future maintenance

[^1]: [Using URL Parameters to View a Report](https://documentation.sas.com/doc/en/vacdc/v_031/vavwr/p0l4zt68r3id4wn1fk3y3kconfg4.htm)