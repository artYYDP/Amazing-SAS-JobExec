# Using Job Execution as a Workflow

Do you have that code you need to run every day to load data into SAS memory? Or a sequence of `.sas` files that need to run in a specific order for the process to work correctly?

With SAS Job Execution, you can turn those processes into automated, organized, and schedulable workflows.

## 📌 What Can You Do?

- Automatically execute SAS routines via scheduling
- Chain `.sas` files as ordered steps
- Avoid manually opening SAS Studio every day
- Standardize executions in corporate environments

## 🔄 How to Build the Workflow?

You can build your workflow in two ways:

### 1. Create a Job Directly in the SAS Environment

You can create a Job in the SAS Environment Manager, directly from the SAS Studio interface, or even from the SAS Job Execution environment[^1]. Although this is a valid approach, I won't go into detail here, as it's not the method I typically use in my day-to-day work.

### 2. Turn a `.sas` File into a Schedulable Job

In SAS Studio, any `.sas` file can be turned into a scheduled Job. Simply click the three dots on the top right side of the code window in SAS Studio, then choose `Schedule as a job`.

![Example image 01](/images/fluxo/01.png)

This opens the scheduling interface, where you can define times, recurrence, and parameters.

![Example image 02](/images/fluxo/02.png)

> [!TIP]
> When using Jobs created from `.sas` files, you can version that process on GitHub and even use automations to run jobs directly from **GitHub** repositories — but that’s a topic for another time. 😉

#### Example of a Chained Workflow

The following example shows how to organize the execution of multiple SAS scripts using macros, folder-based files, and `%include` calls.

You’ll have a main file responsible for orchestrating the execution of the steps:

```sas
/* Scheduling Script in SAS */

/* Define a macro to include the files */
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

/* Define the files */
%let step = step01;
%let folder = /Projects/{project_name}/{code_folder}/;
%let filename = {sas_file_name_01}.sas;
%incluirArquivo(&step, &folder, &filename);

%let step = step02;
%let filename = {sas_file_name_02}.sas;
%incluirArquivo(&step, &folder, &filename);

%let step = step03;
%let filename = {sas_file_name_03}.sas;
%incluirArquivo(&step, &folder, &filename);

/* End of script */
```

This main file becomes your schedulable Job.

## ✅ Benefits

- Automation of complex routines
- Reduction of operational errors
- Standardized and auditable executions
- Integration with version control (GitHub)

[^1]: [Scheduling a Job](https://documentation.sas.com/doc/en/jobexeccdc/v_004/jobexecug/n1gt4ch06ktkzbn1qis2t6zislpv.htm)