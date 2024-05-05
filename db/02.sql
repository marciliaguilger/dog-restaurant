USE DogRestaurant
GO

INSERT INTO dbo.Categorias(IdCategoria, Descricao)
VALUES ('CAT0001', 'Lanches');

INSERT INTO dbo.Categorias(IdCategoria, Descricao)
VALUES ('CAT0002', 'Sobremesas');

INSERT INTO dbo.Categorias(IdCategoria, Descricao)
VALUES ('CAT0003', 'Bebidas');

INSERT INTO dbo.Categorias(IdCategoria, Descricao)
VALUES ('CAT0004', 'Acompanhamentos');

INSERT INTO dbo.Produtos(IdProduto, Nome, Descricao, Preco, IdCategoria)
VALUES('PROD0001','Frango especial', 'Hamburguer de frango com queijo gorgonzola', 25.00, 'CAT0001')

GO