CREATE DATABASE DogRestaurant
GO

USE DogRestaurant
GO

CREATE TABLE dbo.Categories(
    CategoryId varchar(10) NOT NULL,
    CategoryDescription varchar(20) NOT NULL,
    CONSTRAINT PK_Category PRIMARY KEY (CategoryId)
)
GO

CREATE TABLE dbo.Products(
    ProductId varchar(10) NOT NULL,
    ProductName varchar(100) NOT NULL,
    ProductDescription varchar(255) NOT NULL,
    Price money NOT NULL,
    CategoryId varchar(10) NOT NULL,
    CONSTRAINT PK_Product PRIMARY KEY (ProductId),
    CONSTRAINT FK_Product_Category FOREIGN KEY (CategoryId) REFERENCES dbo.Categories(CategoryId)
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
    DeliveredAt DATETIME NULL,
    StartedPreparationAt DATETIME NULL,
    OrderStatus VARCHAR(10) NOT NULL,
    CustomerName varchar(40) NULL,
    CONSTRAINT PK_Order PRIMARY KEY (OrderId),
)

CREATE TABLE dbo.OrderCombs(
    OrderId varchar(40) NOT NULL,
    OrderItemId varchar(40) NOT NULL,
    ProductId varchar(10) NOT NULL,
    CONSTRAINT PK_OrderComb PRIMARY KEY (OrderId),
    CONSTRAINT FK_Order_OrderComb FOREIGN KEY (OrderId) REFERENCES dbo.Orders(OrderId)
)

GO