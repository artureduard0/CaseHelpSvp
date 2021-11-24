# CaseHelpSvp

Como instalar?
1. Instalar o Docker;
2. Clonar o projeto;
3. Entrar no diretório criado através do terminal e executar o comando para instalar e rodar a aplicação:

docker-compose up --build -d

Após o término, é necessário criar um usuário administrador (no caso, é um Diretor Financeiro). Os dados (exceto a senha) podem ser substituídos no comando. Portanto, ainda no terminal, executar:

docker exec -i mysqldb mysql -uroot -proot casehelpsvp -e "insert into users (admin, cellphone, cpf, createdAt, disabled, email, name, password, updatedAt) values (1, '12128119182', '12345678911', '2021-11-24 15:30:46', 0, 'email@email.com', 'Diretor Financeiro', '$2b$10$5IyHE9mFrYK5LkAA/1q9QeTt4rnlXu4k/hMZMlf5Amh1USN2j/TRS', '2021-11-24 15:30:46');"

O login do usuário é o e-mail (email@email.com) e a senha é 123456.

4. Após isso, basta acessar o site através da url: http://localhost:3000 (o primeiro carregamento pode demorar um pouco mais que o normal).