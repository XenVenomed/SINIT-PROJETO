# SINIT - Correr a aplicação

# Paso nº1

Iniciar um servidor PostgreSQL com dois schemas chamados sinit e siget (A diretoria "scripts" contem os scripts sql para a cração dos schemas e das tabelas)

# Paso nº2

As diretorias "siget" e "server" contem ambas um ficheiro ".env", neste ficheiro é necessario introduzir o enedereço do servidor sql criado no passo anterior

# Paso nº3

Iniciar por correr o simulador do siget, ou seja, a diretoria "siget". Para isto apenas é necessario correr os seguintes comandos:

```sh
$ npm install
$ npm start
```

# Paso nº4

Correr o servidor do sinit atraves dos seguintes comandos

```sh
$ npm install
$ npm start
```

# Paso nº5

Dentro da diretoria sinit é necessario modificar o ficheiro "ipAddress.js" para este conter o endereço ip da rede a qual utilizar se encontra ligado
De seguida, inicializar a diretoria utilizando os seguintes comandos

```sh
$ npm install
$ npm start
```

No terminal aparecerá uma ensagem que contem o endereço ip disponivel para realizar a ligação ao sistema atraves do browser do telemovel
