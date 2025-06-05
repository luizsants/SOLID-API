# App

_GymPass Style App._

## RFs (Requisitos funcionais)

- [X] Deve ser possível se cadastrar;
- [X] Deve ser possível se autenticar;
- [X] Deve ser possível obter o perfil de um usuário logado;
- [X] Deve ser possível obeter o número de check-ins realizados pelo usuário logado;
- [X] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (até 10km);
- [X] Deve ser possível o usuário buscar academias pelo nome;
- [X] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [X] Deve ser possível cadastrar uma academia;

## RN (Regras de negócio)

- [X] O usuário não deve poder se cadastra com um e-mail duplicado;
- [X] O usuário não pode fazer 2 check-ins no mesmo dia;
- [X] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [X] O check-in só pode ser validado até 20 minutos após criado;
- [X] O check-in só pode ser validado por administradores;
- [X] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não funcionais)
- [X] A senha do usuário precisa estar criptografada;
- [X] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [X] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [X] O usuário deve ser identificado por um JWT (JSON Web Token);

****************************************
How to run the project in a new machine: 👇📡
****************************************
You gotta to:📱
1º - Download and install Docker.🙂
**You have to check if docker has installed properly (linux subsystem and updates)**🫠🌜
2º - Create a DATABASE by running this line on powershell:🙃
>> docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql 😐🐧

This may create the database now u can run it directly on the interface of the program or run: 🤨
>> docker run api-solid-pg 🫢


Useful commands:
>> docker ps (see the containers running)
>> docker ps -a (see all containers ever created)

Alright, now you gotta to create a .env file in the root folder and copy and paste from the .env.example. 😀🪄

Run directly in the folder after creating the database on docker: 😃
npm install
npx prisma generate 
npx prisma migrate dev


