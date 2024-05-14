## Descrição
Este é um trabalho desenvolvido para a disciplina de Computação Distribuída, com o objetivo de explorar tecnologias e padrões de projeto estudados durante as aulas. Para aplicar os conceitos aprendidos, foi desenvolvida uma API REST para uma rede social simplificada. Considerando o grande número de acessos nas redes sociais atuais, também foi implementada uma distribuição de carga de tarefas, onde a API é replicada e o proxy Nginx distribui as requisições de forma circular.

## Pre-Requesito
[Docker](https://docs.docker.com/engine/install/)

[Docker Compose](https://docs.docker.com/compose/install/)

## Inicialização

Inicialize os containers utilizando o Docker Compose. Na pasta raiz do projeto, execute o seguinte comando:
```bash
  docker compose up -d
```

Gere as tabelas no banco de dados (aguarde alguns segundos após o passo um):
```bash
  docker exec -it api_1 sh -c 'npx sequelize db:migrate'
```

OU

Utilize o script shell disponibilizado na pasta raiz do projeto:
```bash
./init.sh
```

## Rotas

### Usuários
  - FindAll
    - Busca todos os usuários.
    - Método: GET
    - URL: `http://localhost:3000/users`
      
  - FindOne
    - Busca um usuário.
    - Método: GET
    - URL: `http://localhost:3000/users/:user_id`
      
  - Create
    - Cria um usuário.
    - Método: POST
    - URL: `http://localhost:3000/users`
    - Body:
    ```json
    {
        "first_name": "", 
        "last_name": "", 
        "email": "", 
        "password" : ""
    }
    ```
    
  - Update
    - Atualiza os dados de um usuário.
    - Método: PUT
    - URL: `http://localhost:3000/users/:user_id`
    - Body:
    ```json
    {
        "first_name": "", 
        "last_name": "", 
        "email": "", 
        "password" : ""
    }
    ```
    
  - Delete
    - Remove um usuário.
    - Método: DELETE
    - URL: `http://localhost:3000/users/:user_id`

### Posts

  - FindAll
    - Busca todos os posts de usuários.
    - Método: GET
    - URL: `http://localhost:3000/users/:user_id/posts`
      
  - FindOne
    - Busca um post de um usuário.
    - Método: GET
    - URL: `http://localhost:3000/users/:user_id/posts/:post_id`
      
  - Create
    - Cria um post.
    - Método: POST
    - URL: `http://localhost:3000/users/:user_id/posts`
    - Body:
    ```json
    {
        "title": "", 
        "description": ""
    }
    ```
    
  - Update
    - Atualiza os dados de um post.
    - Método: PUT
    - URL: `http://localhost:3000/users/:user_id/posts/:post_id`
    - Body:
    ```json
    {
        "title": "", 
        "description": ""
    }
    ```
    
  - Delete
    - Remove um post.
    - Método: DELETE
    - URL: `http://localhost:3000/users/:user_id/posts/:post_id`

### Comentários

  - FindAll
    - Busca todos os comentários de um post.
    - Método: GET
    - URL: `http://localhost:3000/users/:user_id/posts/:post_id/comments`
      
  - FindOne
    - Busca um comentário de um post.
    - Método: GET
    - URL: `http://localhost:3000/users/:user_id/posts/:post_id/comments/:comment_id`
      
  - Create
    - Cria um comentário em um post.
    - Método: POST
    - URL: `http://localhost:3000/users/:user_id/posts/:post_id/comments`
    - Body:
    ```json
    {
        "text": ""
    }
    ```
    
  - Update
    - Atualiza os dados de um comentário.
    - Método: PUT
    - URL: `http://localhost:3000/users/:user_id/posts/:post_id/comments/:comment_id`
    - Body:
    ```json
    {
        "text": ""
    }
    ```
    
  - Delete
    - Remove um comentário de um post.
    - Método: DELETE
    - URL: `http://localhost:3000/users/:user_id/posts/:post_id/comments/:comment_id`


### Likes
  - Like
    - Curte um post.
    - Método: POST
    - URL: `http://localhost:3000/users/:user_id/posts/:post_id/likes`

  - Unlike
    - Remove o curtir de um post.
    - Método: DELETE
    - URL: `http://localhost:3000/users/:user_id/posts/:post_id/likes`

### Seguidores

  - Follow
    - Segue um usuário.
    - Método: POST
    - URL: `http://localhost:3000/users/:user_id/follow`

  - Unfollow
    - Remove o seguir de um usuário.
    - Método: DELETE
    - URL: `http://localhost:3000/users/:user_id/follow`

### Feed

  - Feed
    - Busca todos os posts que o usuário da sessão segue.
    - Método: GET
    - URL: `http://localhost:3000/feed`
