-- SCHEMA: sinit

-- DROP SCHEMA sinit ;

CREATE TABLE sinit.CIDADAO(
    NIF CHAR(9) PRIMARY KEY,
    Nome VARCHAR(50) NOT NULL,
    Morada VARCHAR(50) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    NomeUtilizador VARCHAR(50) UNIQUE NOT NULL,
    Email VARCHAR(50) NOT NULL,
    Telefone INTEGER NOT NULL
);

CREATE TABLE sinit.CARTA_DE_CONDUCAO(
    NumeroCartaConducao CHAR(10) PRIMARY KEY,
    Validade DATE,
    ClasseVeiculo VARCHAR(2),
	NIF CHAR(9),
	FOREIGN KEY (NIF) REFERENCES sinit.CIDADAO(NIF)
);

CREATE TABLE sinit.VIATURA(
    Matricula CHAR(8) PRIMARY KEY,
    Marca VARCHAR(20) NOT NULL,
    Cor VARCHAR(10) NOT NULL,
    Classe CHAR(2) NOT NULL
);

CREATE TABLE sinit.EVENTO(
    Velocidade INTEGER NOT NULL,
    EventoId INT PRIMARY KEY NOT NULL,
    Data DATE NOT NULL,
    Matricula CHAR(8) NOT NULL,
    Localidade VARCHAR(50) NOT NULL,
    Coima NUMERIC NOT NULL,
	Pago BOOLEAN NOT NULL
);

CREATE TABLE sinit.PAGAMENTO(
    Preco NUMERIC NOT NULL,
    Entidade CHAR(5)  NOT NULL ,
    Referencia CHAR(12) PRIMARY KEY NOT NULL,
	EventoId INT NOT NULL,
	FOREIGN KEY (EventoId) REFERENCES sinit.EVENTO(EventoId)
);

CREATE TABLE sinit.CIDADAO_EVENTO(
    NIF CHAR(9)  NOT NULL,
    EventoId INT NOT NULL,
	FOREIGN KEY (NIF) REFERENCES sinit.CIDADAO(NIF),
	FOREIGN KEY (EventoId) REFERENCES sinit.EVENTO(EventoId)
);

CREATE TABLE sinit.CIDADAO_VIATURA(
     NIF CHAR(9) NOT NULL,
     Matricula CHAR(8) NOT NULL,
	 FOREIGN KEY (NIF) REFERENCES sinit.CIDADAO(NIF),
	 FOREIGN KEY (Matricula) REFERENCES sinit.VIATURA(Matricula)
);
