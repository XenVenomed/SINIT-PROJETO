-- SCHEMA: siget

-- DROP SCHEMA siget ;

CREATE TABLE siget.EVENTO(
    Velocidade INTEGER NOT NULL,
    Data DATE NOT NULL,
    Matricula CHAR(8) NOT NULL,
    Localidade VARCHAR(50) NOT NULL,
    Coima NUMERIC NOT NULL,
    EventoId SERIAL NOT NULL,
    Pago boolean NOT NULL,
    PRIMARY KEY(EventoId)
);

CREATE TABLE siget.PAGAMENTO(
    Preco NUMERIC NOT NULL,
    Entidade CHAR(5) NOT NULL ,
    Referencia CHAR(12) NOT NULL PRIMARY KEY,
	EventoId INT NOT NULL,
	FOREIGN KEY (EventoId) REFERENCES sinit.EVENTO(EventoId)
);


CREATE TABLE siget.EVENTO_POR_REVISAO(
    Velocidade INTEGER NOT NULL,
    Data DATE NOT NULL,
    Matricula CHAR(8) NOT NULL,
    Localidade VARCHAR(50) NOT NULL,
    Coima NUMERIC NOT NULL,
    EventoId SERIAL NOT NULL,
    Pago boolean NOT NULL,
	NifViatura CHAR(9) NOT NULL,
	NifCondutor CHAR(9) NOT NULL,
	NumeroCartaConducao char(10) NOT NULL,
	Nome CHAR(20) NOT NULL,
    PRIMARY KEY(EventoId)
);