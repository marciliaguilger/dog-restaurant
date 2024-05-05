CREATE DATABASE DogRestaurant
GO

USE DogRestaurant
GO

CREATE TABLE dbo.Categorias(
    IdCategoria varchar(10) NOT NULL,
    Descricao varchar(20) NOT NULL,
    CONSTRAINT PK_Categorias PRIMARY KEY (IdCategoria)
)
GO

CREATE TABLE dbo.Produtos(
    IdProduto varchar(10) NOT NULL,
    Nome varchar(100) NOT NULL,
    Descricao varchar(255) NOT NULL,
    Preco money NOT NULL,
    IdCategoria varchar(10) NOT NULL,
    CONSTRAINT PK_Produtos PRIMARY KEY (IdProduto),
    CONSTRAINT FK_Produto_Categoria FOREIGN KEY (IdCategoria) REFERENCES dbo.Categorias(IdCategoria)
)
GO