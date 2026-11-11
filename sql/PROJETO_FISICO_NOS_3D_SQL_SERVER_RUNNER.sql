CREATE DATABASE Teste_Nos3D;
GO
USE Teste_Nos3D;
GO



/* Utilizando o SQL SERVER para Modelar o Projeto Lógico do Banco de Dados Nós_3D:*/


-- Dado o DER Efetuado pelo grupo, as tabelas que não dependem de ninguém são:

--Fornecedor
--Marca
--Categoria
--Forma_Pagamento
--Transportadora
--Canal_de_Venda


-- TABLE Fornecedor:

CREATE TABLE Fornecedor (
    Cod_Fornecedor      INT IDENTITY(1,1)       NOT NULL,
    CNPJ                CHAR(14)                NOT NULL,
    Nome                VARCHAR(50)             NOT NULL,

    CONSTRAINT PK_Fornecedor
        PRIMARY KEY (Cod_Fornecedor),

    CONSTRAINT UQ_Fornecedor_CNPJ
        UNIQUE (CNPJ)
);

--TABLE MARCA:

CREATE TABLE Marca (
    Cod_Marca           INT IDENTITY(1,1)   NOT NULL,
    Nome                VARCHAR(50)         NOT NULL,
    Esta_Ativo          BIT                 NOT NULL DEFAULT   1, -- Atributo Booleano- Ativo por padrão (1/True)

    CONSTRAINT PK_Marca                     PRIMARY KEY (Cod_Marca),

    CONSTRAINT UQ_Marca_Nome                UNIQUE (Nome)
);


-- TABLE CATEGORIA:

CREATE TABLE Categoria (
    Cod_Categoria           INT           NOT NULL,
    Data_Cadastro           DATE          NOT NULL,
    Faixa_Etaria            INT           NOT NULL,
    Descricao               VARCHAR(100)  NOT NULL,
    Nome                    VARCHAR(50)   NOT NULL,
    Esta_Ativo              BIT           NOT NULL, -- Em dúvida se deixo 1 ou 0 para esta categoria

    CONSTRAINT PK_Categoria                 PRIMARY KEY (Cod_Categoria)
);


-- TABLE: Forma Pagamento:

CREATE TABLE Forma_Pagamento (
    Cod_Forma_Pagamento             INT          NOT NULL,
    Descricao                       VARCHAR(100) NOT NULL,

    CONSTRAINT PK_Forma_Pagamento   PRIMARY KEY (Cod_Forma_Pagamento)
);


-- Tabela Transportadora:


CREATE TABLE Transportadora (
    Cod_Transportadora          INT         NOT NULL,
    Telefone                    CHAR(9)     NOT NULL,
    Nome                        VARCHAR(50) NOT NULL,
    CNPJ                        CHAR(14)    NOT NULL,
    Esta_Ativo                  BIT         NOT NULL, --Em dpuvida se deixo 1 ou 0 para essa categoria
    Prazo_Medio_Entrega INT NULL,

    CONSTRAINT PK_Transportadora            PRIMARY KEY (Cod_Transportadora),

    CONSTRAINT UQ_Transportadora_CNPJ       UNIQUE (CNPJ)
);


-- TABLE: CANAL DE VENDA:

CREATE TABLE Canal_de_Venda (
    Cod_Canal                   INT         NOT NULL,
    Nome_Canal                  VARCHAR(50) NOT NULL,
    Tipo                        VARCHAR(50) NOT NULL,

    CONSTRAINT PK_Canal_de_Venda         PRIMARY KEY (Cod_Canal)
);



/* CRIANDO AS TABELAS QUE POSSUEM DEPENDÊNCIAS: */

CREATE TABLE Endereco (
    Cod_Endereco                                            INT IDENTITY(1,1) NOT NULL,

    Bairro                                                  VARCHAR(50) NOT NULL,
    Numero                                                  VARCHAR(10) NOT NULL,
    Estado                                                  CHAR(2) NOT NULL,
    Cidade                                                  VARCHAR(50) NOT NULL,
    Logradouro                                              VARCHAR(50) NOT NULL,
    CEP                                                     CHAR(8) NOT NULL,
    Tipo_Endereco                                           VARCHAR(20),

    fk_Fornecedor_Cod_Fornecedor                            INT NOT NULL,

    CONSTRAINT PK_Endereco      PRIMARY KEY (Cod_Endereco),

    CONSTRAINT CK_Endereco_Estado CHECK (LEN(Estado) = 2),

    CONSTRAINT FK_Endereco_Fornecedor        FOREIGN KEY (fk_Fornecedor_Cod_Fornecedor) REFERENCES Fornecedor(Cod_Fornecedor)
);



-- Tabela CLIENTE: Cliente antes dependia da tabela de Endereços *fk_Endereco_cod_endereco* por que o endereço será infromado no pedido

CREATE TABLE Cliente (
    Cod_Cliente                 INT NOT NULL,
    Data_Cadastro               DATE,
    Nome                        VARCHAR(50) NOT NULL,
    Telefone                    CHAR(9),
    Email                       VARCHAR(50),

    fk_Endereco_Cod_Endereco    INT NOT NULL,

    CONSTRAINT PK_Cliente       PRIMARY KEY (Cod_Cliente),

    CONSTRAINT FK_Cliente_Endereco FOREIGN KEY (fk_Endereco_Cod_Endereco) REFERENCES Endereco(Cod_Endereco)
);


-- Tabela Produtos:


CREATE TABLE Produtos (
    Cod_Produto                             INT NOT NULL,
    Preco                                   FLOAT NOT NULL,
    Quantidade_Estoque                      INT NOT NULL,
    Status_Produtos                         VARCHAR(50) NOT NULL,
    Nome                                    VARCHAR(50) NOT NULL,
    Descricao                               VARCHAR(100) NOT NULL,

    fk_Categoria_Cod_Categoria              INT NOT NULL,

    CONSTRAINT PK_Produtos                  PRIMARY KEY (Cod_Produto),

    CONSTRAINT FK_Produtos_Categoria         FOREIGN KEY (fk_Categoria_Cod_Categoria)   REFERENCES Categoria(Cod_Categoria)
);



-- Tabela Material: Tabela Filha dos três relacionamentos:

-- Fornecedor (1) -- (N) Material
-- Marca      (1) -- (N) Material
-- Produtos   (1) -- (N) Material


CREATE TABLE Material (
    Cod_Material                    INT NOT NULL,
    Materia_Prima                   VARCHAR(50),
    Peso                            FLOAT,
    Cor                             VARCHAR(50),
    Marca                           VARCHAR(50),
    Quantidade_Disponivel           INT,

    fk_Fornecedor_Cod_Fornecedor    INT NOT NULL,
    fk_Produtos_Cod_Produto         INT NOT NULL,
    fk_Marca_Cod_Marca              INT NOT NULL,

    CONSTRAINT PK_Material          PRIMARY KEY (Cod_Material),

    CONSTRAINT FK_Material_Fornecedor    FOREIGN KEY (fk_Fornecedor_Cod_Fornecedor)     REFERENCES Fornecedor(Cod_Fornecedor),

    CONSTRAINT FK_Material_Produtos      FOREIGN KEY (fk_Produtos_Cod_Produto)          REFERENCES Produtos(Cod_Produto),

    CONSTRAINT FK_Material_Marca         FOREIGN KEY (fk_Marca_Cod_Marca)               REFERENCES Marca(Cod_Marca)
);

-- Tabela Pedido Entregas:

CREATE TABLE Pedido_Entrega (
    Cod_Entrega             INT NOT NULL,
    Cod_Rastreio            INT NOT NULL,

    Data_Prevista           DATE,
    Data_Efetiva            DATE,

    fk_Forma_Pagamento_Cod_Forma_Pagamento  INT NOT NULL,
    fk_Canal_de_Venda_Cod_Canal             INT NOT NULL,
    fk_Cliente_Cod_Cliente                  INT NOT NULL,
    fk_Transportadora_Cod_Transportadora    INT NOT NULL,
    fk_Endereco_Cod_Endereco                INT NOT NULL,

    CONSTRAINT PK_Pedido_Entrega                    PRIMARY KEY (Cod_Entrega),

    CONSTRAINT FK_Pedido_Entrega_Forma_Pagamento    FOREIGN KEY (fk_Forma_Pagamento_Cod_Forma_Pagamento)    REFERENCES Forma_Pagamento(Cod_Forma_Pagamento),

    CONSTRAINT FK_Pedido_Entrega_Canal_de_Venda     FOREIGN KEY (fk_Canal_de_Venda_Cod_Canal)               REFERENCES Canal_de_Venda(Cod_Canal),

    CONSTRAINT FK_Pedido_Entrega_Cliente            FOREIGN KEY (fk_Cliente_Cod_Cliente)                    REFERENCES Cliente(Cod_Cliente),

    CONSTRAINT FK_Pedido_Entrega_Transportadora     FOREIGN KEY (fk_Transportadora_Cod_Transportadora)      REFERENCES Transportadora(Cod_Transportadora),

    CONSTRAINT FK_Pedido_Entrega_Endereco           FOREIGN KEY (fk_Endereco_Cod_Endereco)                  REFERENCES Endereco(Cod_Endereco)
);


-- Tabela Produção:

CREATE TABLE Producao (
    Cod_Producao                        INT NOT NULL,
    Tempo_Impressao                     INT NOT NULL,
    Status_Producao                     VARCHAR(50) NOT NULL,
    Data_Inicio                         DATE NOT NULL,
    Quantidade                          INT NOT NULL,
    Data_Conclusao                      DATE NULL,

    fk_Material_Cod_Material            INT NOT NULL,
    fk_Pedido_Entrega_Cod_Entrega       INT NOT NULL,

    CONSTRAINT PK_Producao               PRIMARY KEY (Cod_Producao),

    CONSTRAINT FK_Producao_Material     FOREIGN KEY (fk_Material_Cod_Material)   REFERENCES Material(Cod_Material),

    CONSTRAINT FK_Producao_Pedido_Entrega FOREIGN KEY (fk_Pedido_Entrega_Cod_Entrega)  REFERENCES Pedido_Entrega(Cod_Entrega)
);


-- Tabela Fabricam:

CREATE TABLE Fabricam (
    fk_Producao_Cod_Producao                INT NOT NULL,
    fk_Produtos_Cod_Produto                 INT NOT NULL,

    CONSTRAINT PK_Fabricam                  PRIMARY KEY (fk_Producao_Cod_Producao,fk_Produtos_Cod_Produto), -- Chave Composta

    CONSTRAINT FK_Fabricam_Producao         FOREIGN KEY (fk_Producao_Cod_Producao)   REFERENCES Producao(Cod_Producao),

    CONSTRAINT FK_Fabricam_Produtos         FOREIGN KEY (fk_Produtos_Cod_Produto)   REFERENCES Produtos(Cod_Produto)
);