import express from 'express'

const app = express();

let livros = [];



app.get('/', (req, res) => {
    res.send('seja bem-vindo a gestão de livros');
});

app.get('/livros', (req, res) => {
    res.send('Hello World!');
});
app.listen(3000);

