class libraryEntity {
  constructor(title, author, publication, cod) {
    this.title = title;
    this.author = author;
    this.publication = publication;
    this.cod = cod;
    this.isBorrowed = false;
    this.userBorrower = null;
  }

  borrowBook(user) {
    if (this.isBorrowed) {
      console.log("A entidade ja esta emprestada");
      this.isBorrowed = false;
    } else {
      console.log("Voce acabou de pegar a entidade");
      this.userBorrower = user;
      this.isBorrowed = true;
    }
  }

  returnBook() {
    if (this.isBorrowed) {
      console.log("Voce devolveu a entidade");
      this.isBorrowed = false;
      this.userBorrower = null;
    } else {
      console.log("A entidade nao esta emprestada");
    }
  }
}

class livro extends libraryEntity {
  constructor(title, author, publication, code) {
    super(title, author, publication, cod, genre);
    this.genre = genre;
  }
}

class revista extends libraryEntity {
  constructor(title, author, pubDate, code) {
    super(title, author, pubDate, cod);
  }
}

class User {
  constructor(name, academicRegister, birthDate) {
    this.name = name;
    this.academicRegister = academicRegister;
    this.birthDate = new Date(birthDate);
  }
  getBirthDate() {
    return this.birthDate.toISOString().split("T")[0];
  }
}
