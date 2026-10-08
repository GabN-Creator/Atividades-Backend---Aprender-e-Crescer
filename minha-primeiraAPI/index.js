import express from "express";
import livrosRouter from "./routes/livros-routes.js";
import { logRequest } from "./middlewares/log-requisicao.js";



const app = express(); //Primeiro pilar: instancia do express
const PORT = 3000;

app.use(express.json());
app.use(logRequest) ;

app.use("/livros",livrosRouter );


app.listen(PORT); // porta a ser ouvida
