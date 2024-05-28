
USE DogRestaurant
GO

INSERT INTO dbo.Categorias(CategoriaId, CategoriaDescricao)
VALUES ('CAT001', 'Lanches');

INSERT INTO dbo.Categorias(CategoriaId, CategoriaDescricao)
VALUES ('CAT002', 'Sobremesas');

INSERT INTO dbo.Categorias(CategoriaId, CategoriaDescricao)
VALUES ('CAT003', 'Bebidas');

INSERT INTO dbo.Categorias(CategoriaId, CategoriaDescricao)
VALUES ('CAT004', 'Acompanhamentos');

INSERT INTO dbo.Produtos(ProdutoId, ProdutoNome, ProdutoDescricao, Preco, CategoriaId, Ativo)
VALUES('PROD0001','Frango especial', 'Hamburguer de frango com queijo gorgonzola', 2500, 'CAT001', true)

INSERT INTO dbo.Produtos(ProdutoId, ProdutoNome, ProdutoDescricao, Preco, CategoriaId)
VALUES('PROD0002','Sorvete', 'Sorvete de creme', 2500, 'CAT002')

INSERT INTO dbo.Produtos(ProdutoId, ProdutoNome, ProdutoDescricao, Preco, CategoriaId)
VALUES('PROD0003','Batata Frita', 'Batata frita simples', 2500, 'CAT004')

INSERT INTO dbo.Produtos(ProdutoId, ProdutoNome, ProdutoDescricao, Preco, CategoriaId)
VALUES('PROD0004','Suco de laranja', 'Suco de laranja', 1000, 'CAT003')

INSERT INTO dbo.Customers(CustomerId, CustomerName, CustomerDocument, DocumentType, Email)
VALUES('6B375A98-74B9-4922-94EC-E67EE3ACEAF8', 'Harry Potter', '86106924007', 'CPF', 'harrypotter@fakeemail.com')

INSERT INTO dbo.Customers(CustomerId, CustomerName, CustomerDocument, DocumentType, Email)
VALUES('3CDAE59B-43A9-49C4-8F4A-D58E36B8FC4F', 'Ginevra Weasley', '44198442053', 'CPF', 'gweasley@fakeemail.com')

INSERT INTO dbo.Customers(CustomerId, CustomerName, CustomerDocument, DocumentType, Email)
VALUES('2167EE43-6BA1-40FE-82DC-0C32D273FF09', 'Hermione Granger', '88261898032', 'CPF', 'hgranger@fakeemail.com')

INSERT INTO dbo.Customers(CustomerId, CustomerName, CustomerDocument, DocumentType, Email)
VALUES('DED7E487-C457-4501-8F12-5A5074FC7BF6', 'Ronald Weasley', '82018012029', 'CPF', 'rweasley@fakeemail.com')
GO