# saude-front

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 16.2.10.

## Servidor de desenvolvimento

Execute `ng serve` ou `ng s` para um servidor de desenvolvimento (ou `ng s --port 9999` para definir uma porta). Navegue até `http://localhost:4200/`. O aplicativo será recarregado automaticamente se você alterar algum dos arquivos de origem.

## Code scaffolding

Execute `ng generate component nome-do-componente` para gerar um novo componente. Você também pode usar `ng generate directiva|pipe|service|class|guard|interface|enum|module`.

## Build

Execute `ng build` para construir o projeto. Os artefatos de construção serão armazenados no diretório `dist/`.

## Build para RM

Execute `ng build --base-href=./ --configuration production` para construir o projeto para o aplicativo RM.

## Executando testes unitários

Execute `ng test` para executar os testes de unidade via [Karma](https://karma-runner.github.io).

## Executando testes ponta a ponta

Execute `ng e2e` para executar os testes ponta a ponta através de uma plataforma de sua escolha. Para usar este comando, você precisa primeiro adicionar um pacote que implemente recursos de teste ponta a ponta.

## Mais ajuda

Para obter mais ajuda sobre o Angular CLI, use `ng help` ou confira a página [Visão geral do Angular CLI e referência de comandos](https://angular.io/cli).

## Extras

### Para colocar seu projeto Angular no sistema RM será necessário:

1. Compilar o projeto com o comando `ng build --base-href=./ --configuration production`
2. Na pasta `Dist` será gerada uma pasta `saude-frot` com o projeto compilado, esta pasta deve ser copiada para `Pasta-da-sua-aplicação\Bin\wwwroot`
3. Para verificar se está funcionando corretamente, basta ajustar a url da sua aplicação, alterando a porta e adicionando o nome do projeto, exemplo:
\
Utilizando `demo` como o nome do módulo, acessamos este pela url `http://localhost:4200/demo`.
\
Sendo assim, basta alterar a porta para a utilizada pelo servidor (Configuração `HTTPPORT` informada no arquivo `RM.Host.exe.config`, geralmente a porta é `8052`), e adicionar o projeto antes do módulo, ficando `http://localhost:8052/saude-front/demo`.
