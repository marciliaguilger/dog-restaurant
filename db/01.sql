CREATE DATABASE DogRestaurant
GO

USE DogRestaurant
GO

CREATE TABLE dbo.Categorias(
    CategoriaId varchar(40) NOT NULL,
    CategoriaDescricao varchar(20) NOT NULL,
    CONSTRAINT PK_Categoria PRIMARY KEY (CategoriaId)
)
GO

CREATE TABLE dbo.Produtos(
    ProdutoId varchar(40) NOT NULL,
    ProdutoNome varchar(100) NOT NULL,
    ProdutoDescricao varchar(255) NOT NULL,
    Preco money NOT NULL,
    CategoriaId varchar(40) NOT NULL,
    Ativo bit NOT NULL default(1),
    CONSTRAINT PK_Produto PRIMARY KEY (ProdutoId),
    CONSTRAINT FK_Produto_Categoria FOREIGN KEY (CategoriaId) REFERENCES dbo.Categorias(CategoriaId)
)

CREATE TABLE dbo.Clientes(
    ClienteId varchar(40) NOT NULL,
    ClienteNome varchar(100) NOT NULL,
    ClienteDocumento varchar(50) NOT NULL,
    TipoDocumento varchar(10) NOT NULL,
    Email varchar(100) NOT NULL,
    CONSTRAINT PK_Customer PRIMARY KEY (ClienteId),
)

CREATE TABLE dbo.Pedidos(
    PedidoId varchar(40) NOT NULL,
    ShortId varchar(10) NOT NULL,
    Criado DATETIME NOT NULL,
    PreparacaoIniciada DATETIME NULL,
    PreparacaoConcluida DATETIME NULL,
    Entregue DATETIME NULL,
    Cancelado DATETIME NULL,
    PedidoStatus VARCHAR(25) NOT NULL,
    ClienteId VARCHAR(40) NULL,
    TotalValorCentavos MONEY NOT NULL,
    DescontoValorCentavos MONEY NULL,
    CONSTRAINT PK_Pedido PRIMARY KEY (PedidoId),
    CONSTRAINT FK_Pedido_Customer FOREIGN KEY (ClienteId) REFERENCES dbo.Clientes(ClienteId)
)

CREATE TABLE dbo.PedidosCombos(
    PedidoId varchar(40) NOT NULL,
    ComboId varchar(40) NOT NULL,
    ProdutoId varchar(40) NOT NULL,
    CategoriaId varchar(40) NOT NULL,
    PrecoCentavos MONEY NOT NULL,
    CONSTRAINT PK_PedidoCombo PRIMARY KEY (PedidoId, ComboId, ProdutoId),
    CONSTRAINT FK_Pedido_PedidoCombo FOREIGN KEY (PedidoId) REFERENCES dbo.Pedidos(PedidoId),
    CONSTRAINT FK_Pedido_Produto FOREIGN KEY (ProdutoId) REFERENCES dbo.Produtos(ProdutoId)
)

GO