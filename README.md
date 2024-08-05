Olá! Esta aplicação foi desenvolvida para a vaga de Estágio em Back-End da Neogrid.

A aplicação consiste em criar um WebScraper para obter informações de páginas de produtos do site Netshoes (www.netshoes.com.br).

Para isso, foi desenvolvida uma aplicação em Node.JS.

Requisitos:

 - Node na versão 20.16.0
 - NPM na versão 10.8.1

**Fazendo o download do projeto**
1 - Fazer o clone do projeto para a sua máquina;

2 - Após o download, navegue até o diretório da aplicação;

3 - Em um terminal, execute o comando `npm i` para instalar as dependências do projeto;

4 - Após instalar as dependências, execute o comando `npm run start` para rodar a aplicação;

**Testando a aplicação**

Para testar a API, pode ser utilizado o Postman (https://www.postman.com/downloads/).

1 - Dentro do Postman, insira a seguinte URL: http://localhost:3000/productInfo;

2 - No body da request, insira a propriedade "productUrl", tendo como valor alguma URL de um produto da Nesthoes.
![image](https://github.com/user-attachments/assets/6374d405-90c0-43f4-ba90-dc2a54a75ae0)

Para inserir um a URL de forma gráfica:

1 - Abra um navegador;

2 - Insira a URL `http://localhost:3000/searchProduct`;

3 - Insira uma URL de produto da Nesthoes e clique em "Buscar Informações";

4 - Será feito o download de um arquivo CSV com as informações. A localização do arquivo será mostrada no alert logo após o fim do processamento.


