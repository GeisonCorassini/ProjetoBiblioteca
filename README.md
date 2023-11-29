# Sistema de Biblioteca em JavaScript 



Este exercício tem como objetivo praticar a programação orientada a objetos, trabalhando com classes, herança, e interação entre objetos.





## Parte 1


### Crie uma classe base chamada EntidadeBibliografica com os seguintes atributos:

titulo  
autor  
anoPublicacao  
codigo  
emprestado: booleano  
usuarioEmprestimo: Referência ao usuário que pegou emprestado (pode ser null se não estiver emprestado)  


### Crie duas subclasses de EntidadeBibliografica: Livro e Revista. A classe Livro deve ter um atributo adicional chamado genero.



Implemente os métodos emprestar e devolver na classe EntidadeBibliografica. O método emprestar deve atribuir o usuário que está pegando emprestado e definir emprestado como true. O método devolver deve resetar o status de empréstimo e desatribuir o usuário.


### Crie uma classe Usuario com os seguintes atributos:



nome  
registroAcademico  
dataNascimento (no formato "YYYY-MM-DD") ex. (1995-12-25)

## Parte 2

###Crie uma classe Biblioteca com os seguintes atributos:
acervo: array para armazenar as entidades bibliográficas
usuarios: array para armazenar os usuários

###Implemente os seguintes métodos na classe Biblioteca:

adicionarItem(item): Adiciona uma entidade bibliográfica ao acervo.
listarAcervo(): Exibe o acervo da biblioteca.
adicionarUsuario(usuario): Adiciona um usuário à biblioteca.
emprestarItem(codigo, registroAcademico): Empréstimo de um item para um usuário.
devolverItem(codigo): Devolução de um item ao acervo.
