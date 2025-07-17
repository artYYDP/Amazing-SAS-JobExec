options emailsys=smtp emailhost=('in-v3.mailjet.com' port=587 starttls auth=login id='d870126172a274db907d69954019e131' pw='deeb869fae5ab63504c678cd1b0babfe');

%let nome = Arthur;

/* filename body '/home/adpereira.vert/temp/saida.html'; */
filename part1 "/home/adpereira.vert/temp/part1.html";
filename part3 "/home/adpereira.vert/temp/part2.html";

filename emailmsg email
  from="arthur@festadagabi.com.br"
  to="arthur.diego.pereira@gmail.com"
  subject="🚀 HTML Gerado no SAS JE Teste 20"
  type='text/html'
  ct='text/html';

data _null_;
  file emailmsg lrecl=32767;
  length linha $32767;

  /* part1.html */
  infile part1 lrecl=32767 eof=eof1;
  do while (1);
    input;
    put _infile_;
  end;
  eof1:

  /* part2 (macro put) */
  put "<p>Olá &nome!</p>";
  put "<p>Este é um exemplo de conteúdo HTML gerado e enviado via Job Execution.</p>";

  /* part3.html */
  infile part3 lrecl=32767 eof=eof2;
  do while (1);
    input;
    put _infile_;
  end;
  eof2:
run;

filename emailmsg clear;
filename part1 clear;
filename part3 clear;