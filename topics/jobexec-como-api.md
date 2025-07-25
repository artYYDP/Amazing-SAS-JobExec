# Using Job Execution as an API

The SAS Job Execution Web Application allows you to transform SAS code into API endpoints. This means you can build business logic within SAS and make it available for consumption by other applications through an HTTP request.

This feature is extremely useful for integrating SAS with other systems, front-ends, visualization tools, or automated processes.

## 🧩 API Structure

For a Job to function as an API, it must follow some best practices:

- Use the `out=_webout` parameter to return content via the HTTP response
- Define the expected output type using the `_output_type` parameter (e.g., JSON, HTML, XML...)
- Avoid excessive logging in the response (do not return PROC PRINT or standard SAS outputs)
- Return structured data (e.g., JSON)

## 🔧 Main Parameters

| Parameter        | Location     | Description |
|------------------|--------------|-------------|
| out=_webout      | In the code  | Specifies that the output will be sent in the HTTP response body |
| _output_type=    | In the URL   | Defines the return type: json, html, text, csv, etc. |

## 📦 Example of SAS Code as an API

### 📌 Example 1

The example below runs a query on a SAS table and returns the data in JSON format, ideal for consumption by external systems:

```sas
/* Connect to CAS */
cas casauto;
caslib _all_ assign;

/* Query to retrieve data from the table */
proc sql noprint;
  create table work.resultado as
  select
    CD_IBGE as label,
    upcase(NM_MUN) as value
  from PUBLIC.MUNICIPIOS
  order by NM_MUN asc;
quit;

/* Export as JSON */
proc json out=_webout nosastags pretty;
  export work.resultado;
run;

/* End session */
cas casauto terminate;
```

We added the necessary parameters to make the response possible, as shown in the SAS code:

![IMG01](/images/api/01.png)

This response can be easily consumed by a front-end using **JavaScript**, a **Python application**, or any other system that interacts with **RESTful APIs**.

### 📌 Example 2

Below is an example of a query and response using search parameters passed through the URL:

```sas
/* Connect to CAS */
cas casauto;
caslib _all_ assign;

/* Query to retrieve data from the table */
proc sql noprint;
  create table work.resultado as
  select
    CD_IBGE as label,
    upcase(NM_MUN) as value
  from PUBLIC.MUNICIPIOS
  where CD_UF = upcase("&uf")  /* Filter based on the "uf" parameter from the URL */
  order by NM_MUN asc;
quit;

/* Export as JSON */
proc json out=_webout nosastags pretty;
  export work.resultado;
run;

/* End session */
cas casauto terminate;
```

![IMG02](/images/api/02.png)

Add the parameter at the end of the SAS Job Execution URL:

![IMG03](/images/api/03.png)

As an example, we added the parameter `&uf=ES` so that the JSON response only returns cities from the state of Espírito Santo. Here's the result:

![IMG04](/images/api/04.png)

## ✅ Important Tips

- Avoid code that generates multiple outputs and always use the `noprint` option when available.
- Test your Job in the browser with `_output_type=json` before integrating it.
- Use macros to validate input parameters and handle errors (this prevents unexpected API failures).
- If you want your Job to accept parameters from the request, use `&parameter_name` in the SAS code and pass the parameter via URL[^1].

[^1]: [Passing User Input to a Job Using the Query String](documentation.sas.com/doc/en/jobexeccdc/v_004/jobexecug/n1c1nbeo2i1lhgn1ut1yuqz5ykqa.htm)