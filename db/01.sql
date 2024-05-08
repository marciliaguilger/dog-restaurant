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
GO