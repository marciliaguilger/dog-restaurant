CREATE DATABASE DogRestaurant
GO

USE DogRestaurant
GO

CREATE TABLE dbo.Categories(
    CategoryId varchar(40) NOT NULL,
    CategoryDescription varchar(20) NOT NULL,
    CONSTRAINT PK_Category PRIMARY KEY (CategoryId)
)
GO

CREATE TABLE dbo.Products(
    ProductId varchar(40) NOT NULL,
    ProductName varchar(100) NOT NULL,
    ProductDescription varchar(255) NOT NULL,
    Price money NOT NULL,
    CategoryId varchar(40) NOT NULL,
    Active bit NOT NULL default(1),
    CONSTRAINT PK_Product PRIMARY KEY (ProductId),
    CONSTRAINT FK_Product_Category FOREIGN KEY (CategoryId) REFERENCES dbo.Categories(CategoryId)
)

CREATE TABLE dbo.Clientes(
    ClienteId varchar(40) NOT NULL,
    ClienteNome varchar(100) NOT NULL,
    ClienteDocumento varchar(50) NOT NULL,
    TipoDocumento varchar(10) NOT NULL,
    Email varchar(100) NOT NULL,
    CONSTRAINT PK_Customer PRIMARY KEY (ClienteId),
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
    ClienteId VARCHAR(40) NULL,
    TotalAmountInCents MONEY NOT NULL,
    DiscountAmountInCents MONEY NULL,
    CONSTRAINT PK_Order PRIMARY KEY (OrderId),
    CONSTRAINT FK_Order_Customer FOREIGN KEY (ClienteId) REFERENCES dbo.Clientes(ClienteId)
)

CREATE TABLE dbo.OrderCombos(
    OrderId varchar(40) NOT NULL,
    ComboId varchar(40) NOT NULL,
    ProductId varchar(10) NOT NULL,
    CategoryId varchar(40) NOT NULL,
    PriceInCents MONEY NOT NULL,
    CONSTRAINT PK_OrderCombo PRIMARY KEY (OrderId, ComboId, ProductId),
    CONSTRAINT FK_Order_OrderCombo FOREIGN KEY (OrderId) REFERENCES dbo.Orders(OrderId)
)

GO