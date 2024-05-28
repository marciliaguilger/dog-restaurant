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

CREATE TABLE dbo.Customers(
    CustomerId varchar(40) NOT NULL,
    CustomerName varchar(100) NOT NULL,
    CustomerDocument varchar(50) NOT NULL,
    DocumentType varchar(10) NOT NULL,
    Email varchar(100) NOT NULL,
    CONSTRAINT PK_Customer PRIMARY KEY (CustomerId),
)

CREATE TABLE dbo.Orders(
    OrderId varchar(40) NOT NULL,
    ShortId varchar(10) NOT NULL,
    CreatedAt DATETIME NOT NULL,
    StartedPreparationAt DATETIME NULL,
    PreparationConcludedAt DATETIME NULL,
    DeliveredAt DATETIME NULL,
    CancelledAt DATETIME NULL,
    OrderStatus VARCHAR(25) NOT NULL,
    CustomerId VARCHAR(40) NULL,
    TotalAmountInCents MONEY NOT NULL,
    DiscountAmountInCents MONEY NULL,
    CONSTRAINT PK_Order PRIMARY KEY (OrderId),
    CONSTRAINT FK_Order_Customer FOREIGN KEY (CustomerId) REFERENCES dbo.Customers(CustomerId)
)

CREATE TABLE dbo.OrderCombos(
    OrderId varchar(40) NOT NULL,
    ComboId varchar(40) NOT NULL,
    ProdutoId varchar(10) NOT NULL,
    CategoryId varchar(40) NOT NULL,
    PriceInCents MONEY NOT NULL,
    CONSTRAINT PK_OrderCombo PRIMARY KEY (OrderId, ComboId, ProductId),
    CONSTRAINT FK_Order_OrderCombo FOREIGN KEY (OrderId) REFERENCES dbo.Orders(OrderId),
    CONSTRAINT FK_Order_Produto FOREIGN KEY (ProdutoId) REFERENCES dbo.Produtos(ProdutoId)
)

GO