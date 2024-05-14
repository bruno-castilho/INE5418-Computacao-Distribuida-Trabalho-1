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
### Comentários
### Likes
### Seguidores
### Feed
