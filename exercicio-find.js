//crie um array de objeto
//encontre, usando um FOR um unico registro, de acordo de acordo com uma condicao

//depois, econtre o mesmo registro usando um find

const objetos = [
    {id: 1, nome: "óculos", valor: 1000},
    {id: 2, nome: "livro", valor: 44},
    {id: 3, nome: "casaco",  valor: 300},
    {id: 4, nome: "garrafa", valor: 60},
];
 
// for(i=0; i < objetos.length; i++){
//     let objeto_achar = objetos[i];
//      if(objeto_achar.id == 2){
//         console.log("encontrei o objeto")
//         console.log(objeto_achar)
//     }
// };

const objeto_achar = objetos.find((u) => u.valor < 300);
console.log (objeto_achar);