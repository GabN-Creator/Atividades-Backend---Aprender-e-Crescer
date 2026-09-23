import express from "express";

const app = express(); // Primeiro pilar: instancia do express
app.use(express.json());
const PORT = 3000;

// 1. Criamos a variável ultimo_id no escopo global
let ultimo_id = 1;

let livros = [
  { id: 1, dsTitulo: "As cronicas de narnia", dsAutor: "C.S. Lewis" },
]; // banco de dados

// metodos + caminhos + função
app.get("/", (req, res) => {
  res.send("rota raiz");
});

app.get("/livros", (req, res) => {
  res.json(livros);
});

app.get("/livros/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res
      .status(400)
      .json({ mensagem: "o parametro deve ser um numero valido" });
  }

  // find
  let livro = livros.find((livro) => {
    return livro.id === id;
  });

  if (!livro) {
    return res.status(404).send();
  }

  res.json(livro);
});

app.post("/livros", (req, res) => {
  // 2. Incrementa o id para o novo livro
  ultimo_id = ultimo_id + 1;

  let autor_enviado = req.body.autor;
  let titulo_enviado = req.body.titulo;

  let novo_livro = {
    id: ultimo_id, // mantendo a padronização 'id' do primeiro objeto
    fgDisponivel: true,
    dsTitulo: titulo_enviado,
    dsAutor: autor_enviado,
  };

  livros.push(novo_livro);

  // 3. Retorna a resposta ao cliente (Status 201: Criado)
  res.status(201).json(novo_livro);
});

app.listen(PORT);