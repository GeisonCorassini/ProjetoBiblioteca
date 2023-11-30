class EntidadeBibliografica {
  constructor(titulo, autor, anoPublicacao, codigo) {
    this.titulo = titulo;
    this.autor = autor;
    this.anoPublicacao = anoPublicacao;
    this.codigo = codigo;
    this.emprestado = false;
    this.usuarioEmprestimo = null;
  }

  emprestar(usuario) {
    if (!this.emprestado) {
      this.emprestado = true;
      this.usuarioEmprestimo = usuario;
    } else {
      console.log("A entidade já está emprestada.");
    }
  }

  devolver() {
    if (this.emprestado) {
      this.emprestado = false;
      this.usuarioEmprestimo = null;
    } else {
      console.log("A entidade não está emprestada.");
    }
  }
}

class Livro extends EntidadeBibliografica {
  constructor(titulo, autor, anoPublicacao, codigo, genero) {
    super(titulo, autor, anoPublicacao, codigo);
    this.genero = genero;
  }

  informacoes() {
    console.log(`Livro: ${this.titulo}, Autor: ${this.autor}, Gênero: ${this.genero}`);
  }
}

class Revista extends EntidadeBibliografica {
  constructor(titulo, autor, anoPublicacao, codigo, edicao) {
    super(titulo, autor, anoPublicacao, codigo);
    this.edicao = edicao;
  }

  informacoes() {
    console.log(`Revista: ${this.titulo}, Autor: ${this.autor}, Edição: ${this.edicao}`);
  }
}

class Usuario {
  constructor(nome, registroAcademico, dataNascimento) {
    this.nome = nome;
    this.registroAcademico = registroAcademico;
    this.dataNascimento = new Date(dataNascimento);
  }
}

class Biblioteca {
  constructor() {
    this.acervo = [];
    this.usuarios = [];
  }

  adicionarItem(item) {
    this.acervo.push(item);
  }

  listarAcervo() {
    console.log("Acervo da Biblioteca:");
    this.acervo.forEach(item => console.log(`- ${item.titulo}`));
  }

  adicionarUsuario(usuario) {
    this.usuarios.push(usuario);
  }

  emprestarItem(codigo, registroAcademico) {
    const item = this.acervo.find(item => item.codigo === codigo);
    const usuario = this.usuarios.find(user => user.registroAcademico === registroAcademico);

    if (item && usuario) {
      if (!item.emprestado) {
        item.emprestar(usuario);
        exibirMensagem(`Item ${item.titulo} emprestado para ${usuario.nome}.`, true);
        console.log(`Item ${item.titulo} emprestado para ${usuario.nome}.`);
      } else {
        exibirMensagem(`O item ${item.titulo} já está emprestado.`, false);
        console.log(`O item ${item.titulo} já está emprestado.`);
      }
    } else {
      exibirMensagem("Item ou usuário não encontrado.", false);
      console.log("Item ou usuário não encontrado.");
    }
  }

  devolverEntidadePorCodigo(codigo) {
    const entidadeParaDevolucao = this.acervo.find(item => item.codigo === codigo);

    if (entidadeParaDevolucao) {
      entidadeParaDevolucao.devolver();
      console.log(`Entidade ${entidadeParaDevolucao.titulo} devolvida com sucesso.`);
      return true;
    } else {
      console.log("Entidade não encontrada para devolução.");
      return false;
    }
  }

  buscarEntidadePorCodigo(codigo) {
    return this.acervo.find(item => item.codigo === codigo);
  }
}

// Função para exibir mensagens na interface
function exibirMensagem(mensagem, sucesso = true) {
  const mensagemDiv = document.getElementById('mensagem');
  mensagemDiv.textContent = mensagem;
  mensagemDiv.style.color = sucesso ? 'green' : 'red';

  // Limpa a mensagem após alguns segundos
  setTimeout(() => {
    mensagemDiv.textContent = '';
  }, 3000);
}

// Função para cadastrar um livro
function cadastrarLivro() {
  const titulo = document.getElementById('livroTitulo').value;
  const autor = document.getElementById('livroAutor').value;
  const ano = document.getElementById('livroAno').value;
  const codigo = document.getElementById('livroCodigo').value;
  const genero = document.getElementById('livroGenero').value;

  if (titulo && autor && ano && codigo && genero) {
    const livro = new Livro(titulo, autor, ano, codigo, genero);
    biblioteca.adicionarItem(livro);

    exibirMensagem("Livro cadastrado com sucesso!", true);
    console.log("Livro cadastrado:", livro);

    // Limpa os campos após o cadastro bem-sucedido
    limparCamposLivro();
  } else {
    exibirMensagem("Preencha todos os campos para cadastrar o livro.", false);
  }
}

// Função para cadastrar um usuário
function cadastrarUsuario() {
  const nome = document.getElementById('usuarioNome').value;
  const registro = document.getElementById('usuarioRegistro').value;
  const dataNascimentoInput = document.getElementById('usuarioDataNascimento');
  const dataNascimento = dataNascimentoInput.valueAsDate;

  if (nome && registro && dataNascimento) {
    const usuario = new Usuario(nome, registro, dataNascimento);
    biblioteca.adicionarUsuario(usuario);

    exibirMensagem("Usuário cadastrado com sucesso!", true);
    console.log("Usuário cadastrado:", usuario);

    // Limpa os campos após o cadastro bem-sucedido
    limparCamposUsuario();
  } else {
    exibirMensagem("Preencha todos os campos para cadastrar o usuário.", false);
  }
}


// Função para emprestar um item
function emprestarItem() {
  const codigo = document.getElementById('itemCodigo').value;
  const registro = document.getElementById('usuarioRegistroEmprestimo').value;

  if (codigo && registro) {
    biblioteca.emprestarItem(codigo, registro);
  } else {
    exibirMensagem("Preencha todos os campos para realizar o empréstimo.", false);
  }
}

// Função para devolver uma entidade
function devolverItem() {
  const codigo = document.getElementById('itemCodigoDevolucao').value;

  if (codigo) {
    const sucessoDevolucao = biblioteca.devolverEntidadePorCodigo(codigo);

    if (sucessoDevolucao) {
      exibirMensagem("Entidade devolvida com sucesso.", true);
    } else {
      exibirMensagem("Entidade não encontrada para devolução.", false);
    }
  } else {
    exibirMensagem("Digite um código para devolver a entidade.", false);
  }
}

// Função para buscar informações de uma entidade
function exibirInformacoesEntidade() {
  const codigoBusca = document.getElementById('codigoBusca').value;

  if (codigoBusca) {
    const entidadeEncontrada = biblioteca.buscarEntidadePorCodigo(codigoBusca);

    if (entidadeEncontrada) {
      exibirMensagem(`Informações da entidade: ${entidadeEncontrada.titulo}`, true);
    } else {
      exibirMensagem("Entidade não encontrada.", false);
    }
  } else {
    exibirMensagem("Digite um código para buscar a entidade.", false);
  }
}

// Função para limpar os campos de cadastro de livro
function limparCamposLivro() {
  document.getElementById('livroTitulo').value = '';
  document.getElementById('livroAutor').value = '';
  document.getElementById('livroAno').value = '';
  document.getElementById('livroCodigo').value = '';
  document.getElementById('livroGenero').value = '';
}

// Função para limpar os campos de cadastro de usuário
function limparCamposUsuario() {
  document.getElementById('usuarioNome').value = '';
  document.getElementById('usuarioRegistro').value = '';
  document.getElementById('usuarioDataNascimento').value = '';
}

// Instância da biblioteca
const biblioteca = new Biblioteca();
