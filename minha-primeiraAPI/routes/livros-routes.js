import { Router } from "express";
import * as livrosController from "../controllers/livros-controller.js";
import { ValidaParametro } from "../middlewares/validaParametro.js"
import { validaIndex } from "../middlewares/valida-index_livro.js";

const router = Router();


router.get("/", (req, res) => {
  const todosOsLivros = livrosController.findAll(req, res);
  res.json(todosOsLivros);
});

router.get("/:id", ValidaParametro, validaIndex, (req, res) => {
  const unicoLivro = livrosController.findOne(req, res);

  if (!unicoLivro) {
    return res.status(404).send();
  };

  res.json(unicoLivro);
});

router.post("/", (req, res) => {
  const autor_enviado = req.body.dsAutor;
  const titulo_enviado = req.body.dsTitulo;

  if (!autor_enviado || !titulo_enviado) {
    return res
      .status(400)
      .json({ mensagem: "dados faltando, verifique autor e titulo" });
  }

  const novo_livro = livrosController.criarLivro(req, res);
  res.status(201).json(novo_livro);
});

router.delete("/:id", ValidaParametro, validaIndex, (req, res) => {
  livrosController.deletarLivro(req, res);
  res.status(204).send();
});

router.patch("/:id", ValidaParametro, validaIndex, (req, res) => {
  const livro_editado = livrosController.editarLivro(req, res);
  res.status(200).json(livro_editado);
});

router.patch("/:id/emprestar", ValidaParametro, validaIndex, (req, res) => {
  const livro_emprestado = livrosController.emprestarLivro(req, res);

  if (!livro_emprestado) {
    return res
      .status(409) // conflito
      .json({ mensagem: "Conflito: o livro já esta emprestado" });
  }

  res.status(200).json(livro_emprestado);
});

router.patch("/:id/devolver", ValidaParametro, validaIndex, (req, res) => {
  const livro_devolvido = livrosController.devolverLivro(req, res);

  if (!livro_devolvido) {
    return res
      .status(409) // conflito
      .json({ mensagem: "Conflito: o livro já esta disponivel" });
  }

  res.status(200).json(livro_devolvido);
});



export default router;
