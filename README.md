<div align="center"><h1>auction-api</h1></div>

<div align="center">
  <img src="https://img.shields.io/static/v1?label=express&message=^4.17.3&color=000000&logo=Express" />
  <img src="https://img.shields.io/static/v1?label=node&message=%3E=16&color=339933&logo=Node.js" />
  <img src="https://img.shields.io/static/v1?label=TypeORM&message=^0.2.411&color=red" />
  <img src="https://img.shields.io/static/v1?label=typescript&message=^5.0.4&color=3178C6&logo=Typescript" />
</div>

## Objetivos

Aplicação que simula basicamente a criação de um Leilão

## Comandos para rodar a aplicação

  - ### Local
    ```
      yarn
      Criar um arquivo .env na raiz do projeto com base no .env.example
      docker-compose up -d (OBS: docker-compose DEVE estar na versão 1.25)
    ```
    > *URL: http://localhost:3000/*


<summary><h2>Regras adotadas</h2></summary>

- A documentação do projeto pode ser acessada em http://localhost:3000/api/v1/docs
- Foi criado a api da seguinte forma, existem as rotas para criação e autenticação de usuários que podem acessar o sistema. Existem somente dois tipos de usuários: **seller** e **buyer**.
- **Somente** usuários do tipo **seller** tem acesso para criar um produto. Então para criar um novo produto, deve ser primeiro criado um usuário do tipo **seller**, para depois ser utilizado seu token para a criação do produto.
- Com o produto criado, agora pode ser criado uma nova **auction**, se passando os produtos que vão fazer parte dessa auction (produtos vinculados ao seller).
- O próximo passo é a criação de um usuário com o tipo **buyer**, para que seja possível realizar os lances aos produtos. **Somente** usuários tipo **buyer** podem dar lances em produtos de auctions.
- Foi criado um cronjob na aplicação que depois de uma hora irá finalizar essa auction, realizando a transferência do produto do antigo seller para o novo dono buyer (OBS: O novo dono (buyer) pode criar uma nova auction, e o processo continua).
