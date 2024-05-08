docker compose up -d

sleep 5

docker exec -it api_1 sh -c 'npx sequelize db:migrate'