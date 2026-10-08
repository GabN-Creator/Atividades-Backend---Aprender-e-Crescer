import express from "express";
import livrosRouter from "./routes/livros-routes.js";
import { logRequest } from "./middlewares/log-requisicao.js";

<<<<<<< HEAD


const app = express(); //Primeiro pilar: instancia do express
const PORT = 3000;

app.use(express.json());
app.use(logRequest) ;

app.use("/livros",livrosRouter );


app.listen(PORT); // porta a ser ouvida
=======
function validaParametro(parametro_a_ser_validado){
    const numero = parseInt(parametro_a_ser_validado)
    return isNaN(numero); // retorna true se NÃO for número
}

const app = express();
app.use(express.json())
const PORT = 3000;

let ultimo_id = 1
let livros = [
    { id: 1, dsTitulo: "As cronicas de narnia", dsAutor: "C.S. Lewis", fgDisponivel: true },
];

app.get("/", (req, res) => {
    res.send("rota raiz");
});

app.get("/livros", (req, res) => {
    res.json(livros);
});

app.get("/livros/:id", (req, res) => {
    // CORRIGIDO: Pegando o id dos parâmetros da requisição
    const id = parseInt(req.params.id);

    // CORRIGIDO: Se for NaN (validaParametro der true), aí sim dá o erro
    if (validaParametro(req.params.id)) {
        return res
            .status(400)
            .json({ mensagem: "o parametro deve ser um numero valido" });
    }

    let livro = livros.find((livro)=>{
        return livro.id === id;
    });

    if (!livro){
        return res.status(404).send()
    }

    res.json(livro);
});

app.post("/livros", (req,res) => {
    // CORRIGIDO: dsAutor e dsTitulo com letras maiúsculas para bater com o objeto
    let autor_enviado = req.body.dsAutor 
    let titulo_enviado = req.body.dsTitulo

    if (!autor_enviado || !titulo_enviado) {
        return res.status(400)
            .json({mensagem: "dados faltando, verifique autor e titulo"})
    }

    let id_novo = ultimo_id + 1;
    ultimo_id++;

    let novo_livro = {
        id: id_novo,
        fgDisponivel: true,
        dsTitulo: titulo_enviado,
        dsAutor: autor_enviado,
    };

    livros.push(novo_livro)
    res.status(201).json(novo_livro)
})

app.patch('/livros/:id', (req,res) =>{
    const id = parseInt(req.params.id)
    const novo_titulo = req.body.dsTitulo;
    const novo_autor = req.body.dsAutor;

    if(isNaN(id)) {
        return res
            .status(400)
            .json({mensagem: "indentificador presisa ser um numero valido"})
    }

    let index_livro = livros.findIndex((livro)=> {
        return livro.id === id;
    })

    if (index_livro === -1) {
        return res.sendStatus(404);
    }

    let livro_a_ser_atualizado = livros[index_livro];

    if (novo_autor !== undefined ) livro_a_ser_atualizado.dsAutor = novo_autor;
    if (novo_titulo !== undefined) livro_a_ser_atualizado.dsTitulo = novo_titulo;

    res.json(livro_a_ser_atualizado);
});


app.patch("/livros/:id/emprestimo", (req,res) =>{
    const id = parseInt(req.params.id)

    if(isNaN(id)) {
        return res.status(400).json({mensagem: "id invalido"})
    }

    let index_livro = livros.findIndex((livro)=> {
        return livro.id === id;
    })

    if (index_livro === -1) {
        return res.sendStatus(404);
    }

    
    livros[index_livro].fgDisponivel = false;

    res.json(livros[index_livro]);
})



app.patch("/livros/:id/devolver", (req,res) =>{
    const id = parseInt(req.params.id)

    if(isNaN(id)) {
        return res.status(400).json({mensagem: "id invalido"})
    }

    let index_livro = livros.findIndex((livro)=> {
        return livro.id === id;
    })

    if (index_livro === -1) {
        return res.sendStatus(404);
    }

    livros[index_livro].fgDisponivel = true;

    res.json(livros[index_livro]);
})
>>>>>>> 6b3756603ee1e859e1eea71b5007697511ece15b
