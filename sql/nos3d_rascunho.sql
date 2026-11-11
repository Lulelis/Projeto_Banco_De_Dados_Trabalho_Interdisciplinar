--- Tabelas Criadas pela Maria Eduarda:: MATERIAL & CLIENTE FALTA DECLARAR AS CHAVES ESTRANGEIRAS FK

--- Teste para o Database:


CREATE DATABASE Teste_Nos3D;
GO
USE Teste_Nos3D;
GO

CREATE DATABASE IF NOT EXISTS meu_banco
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS Material (
    Cod_Material                 INTEGER NOT NULL,
    Materia_prima                VARCHAR(50),
    Peso                         FLOAT,
    Cor                          VARCHAR(50),
    Marca                        VARCHAR(50),
    Quantidade_Disponivel        INTEGER,
    fk_Fornecedor_Cod_Fornecedor INTEGER,
    fk_Produtos_Cod_Produto      INTEGER,
    fk_Marca_cod_marca           INTEGER,

    PRIMARY KEY (Cod_Material)
);

CREATE TABLE IF NOT EXISTS Cliente (
    Cod_Cliente              INTEGER NOT NULL,
    Data_Cadastro            DATE,
    Nome                     VARCHAR(50),
    telefone                 CHAR(9),
    email                    VARCHAR(50),
    fk_Endereco_cod_endereco INTEGER,

    PRIMARY KEY (Cod_Cliente)
);

-- Tabelas Criada pela Gabriela: ENDEREÇO, FORNECEDOR & MARCA



CREATE TABLE IF NOT EXISTS fornecedor (
    cod_fornecedor INT AUTO_INCREMENT,
    cnpj CHAR(14) NOT NULL,
    nome VARCHAR(50) NOT NULL,

    CONSTRAINT pk_fornecedor PRIMARY KEY (cod_fornecedor),
    CONSTRAINT uq_fornecedor_cnpj UNIQUE (cnpj)
);

CREATE TABLE IF NOT EXISTS marca (
    cod_marca INT AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    esta_ativo BIT NOT NULL DEFAULT TRUE,

    CONSTRAINT pk_marca PRIMARY KEY (cod_marca),
    CONSTRAINT uq_marca_nome UNIQUE (nome)
);

CREATE TABLE IF NOT EXISTS endereco (

    cod_endereco INT AUTO_INCREMENT,
    bairro VARCHAR(50) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    estado CHAR(2) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    logradouro VARCHAR(100) NOT NULL,
    cep CHAR(8) NOT NULL,
    tipo_endereco VARCHAR(20),
    fk_fornecedor_cod_fornecedor INT,

    CONSTRAINT pk_endereco PRIMARY KEY (cod_endereco),
    CONSTRAINT ck_endereco_estado CHECK (CHAR_LENGTH(estado) = 2),
    CONSTRAINT fk_endereco_fornecedor
        FOREIGN KEY (fk_fornecedor_cod_fornecedor)
        REFERENCES fornecedor (cod_fornecedor)
);

--- TABELAS CRIADAS POR mim:Produção, Produtos, Categoria, canal de venda e fabricam


CREATE TABLE Producao (
    Cod_Producao            INTEGER     NOT NULL,
    Tempo_Impressao         INTEGER     NOT NULL,
    Status_Producao         VARCHAR(50) NOT NULL,
    Data_Inicio             DATE        NOT NULL,
    Quantidade              INTEGER     NOT NULL,
    Data_Conclusao          DATE        NULL,

    CONSTRAINT      PK_Codigo_Producao PRIMARY KEY (Cod_Producao),
    CONSTRAINT      FK_Material_Producao  FOREIGN KEY  (Cod_Material)
            REFERENCES Material (Cod_Material),
    CONSTRAINT      FK_Producao_Entrega FOREIGN KEY (Cod_Entrega) 
            REFERENCES Pedido_Entrega (Cod_Entrega)
);

CREATE TABLE Produtos (
    Cod_Produto         INTEGER     NOT NULL,
    Preco               FLOAT       NOT NULL,
    Quantidade_Estoque  INTEGER     NOT NULL,
    Status_Produtos     VARCHAR(50) NOT NULL,
    Nome                VARCHAR(50) NOT NULL,
    Categoria           VARCHAR(50) NOT NULL,
    Descricao           VARCHAR(100) NOT NULL,

    CONSTRAINT      PK_Cod_Produto  PRIMARY KEY(Cod_Produto),
    CONSTRAINT      FK_Produtos_Categoria FOREIGN KEY (Cod_Categoria)
        REFERENCES  Categoria (Cod_Categoria)
);

CREATE TABLE Categoria (    
    Data_Cadastro     DATE           NOT NULL,
    Faixa_Etaria      INTEGER        NOT NULL,
    Cod_Categoria     INTEGER        NOT NULL, 
    Descricao         VARCHAR(100)   NOT NULL,
    Nome              Varchar(50)    NOT NULL,
    Esta_Ativo        BIT            NOT NULL, --1 PARA VERDADEIRO 0 PARA FALSO!

    CONSTRAINT PK_Cod_Categoria PRIMARY KEY (Cod_Categoria)
   
);


CREATE TABLE Canal_de_Venda  (
    Cod_Canal       INTEGER     NOT NULL,
    Nome_Canal      VARCHAR(50) NOT NULL,
    Tipo            VARCHAR(50) NOT NULL,

    CONSTRAINT PK_Canal_de_Venda PRIMARY KEY (Cod_Canal)

);

CREATE TABLE Fabricam(
    Cod_Producao        INTEGER NOT NULL,
    Cod_Produto         INTEGER NOT NULL,

    CONSTRAINT          PK_Fabricam PRIMARY KEY (Cod_Producao, Cod_Produto), -- Chave PRIMÁRIA COMPOSTA
   


    CONSTRAINT FK_Fabricam_Produtos FOREIGN KEY (Cod_Produto)
            REFERENCES Produtos (Cod_Produto),

    CONSTRAINT FK_Fabricam_Produtos FOREIGN KEY (Cod_Produto)
            REFERENCES Produtos (Cod_Produto)
    
);

-- TABELAS CRIADAS: GIOVANNA: TRANSPORTADORA, PEDIDO ENTREGA E FORMA DE PAGAMENTO:

CREATE TABLE Forma_Pagamento (
    Cod_Forma_Pagamento INT         NOT NULL,
    Descricao VARCHAR(100)          NOT NULL,

    CONSTRAINT PK_Forma_Pagamento PRIMARY KEY (Cod_Forma_Pagamento)
);

CREATE TABLE Transportadora (
    Cod_Transportadora INT      NOT NULL,
    Telefone CHAR(9)            NOT NULL,
    Nome VARCHAR(50)            NOT NULL,
    CNPJ CHAR(14)               NOT NULL,
    Esta_Ativo BIT              NOT NULL,
    Prazo_Medio_Entrega INT     NULL,

    CONSTRAINT PK_Transportadora PRIMARY KEY (Cod_Transportadora)
);

CREATE TABLE Pedido_Entrega (
    Cod_Entrega INT         NOT NULL,
    Cod_Rastreio INT        NOT NULL,
    Endereco VARCHAR(100)   NOT NULL,
    Data_Prevista DATE,
    Data_Efetiva DATE,

    fk_Forma_Pagamento_Cod_Forma_Pagamento INT,
    fk_Canal_de_Venda_Cod_Canal_de_Venda INT,
    fk_Cliente_Cod_Cliente INT,
    fk_Transportadora_Cod_Transportadora INT,

    CONSTRAINT PK_Pedido_Entrega PRIMARY KEY (Cod_Entrega),

    CONSTRAINT FK_Pedido_Forma_Pagamento
        FOREIGN KEY (fk_Forma_Pagamento_Cod_Forma_Pagamento)
        REFERENCES Forma_Pagamento(Cod_Forma_Pagamento),

    CONSTRAINT FK_Pedido_Transportadora
        FOREIGN KEY (fk_Transportadora_Cod_Transportadora)
        REFERENCES Transportadora(Cod_Transportadora)
);