const express = require('express');
const app = express();

app.use(express.json());

let products = [
    {
        name: 'milk',
        id: "8382747"
    },
    {
        name: "bread",
        id: "635272"
    }
];

const idGenerator = ()=>{
    let idOfProduct = Math.floor(Math.random() * (1000000 - 100000 + 1) ) + 100000;
    product.id = idOfProduct;
    products.map(obj=>{
        if(obj.id===idOfProduct){
            idOfProduct = idGenerator(products);
        }
    });
    return idOfProduct.toString();
}



app.post('/product', (req, res) =>{
    req.body.id = idGenerator();
    products.push(req.body);
    res.send(req.body);
    
});


app.delete('/product/:id', (req, res) =>{
    products.forEach((product, index) =>{
        if(product.id === req.params.id){
            products.splice(index, 1);
            res.send(req.params.id + ' deleted');
        }
    });
});


app.put('/product/:id', (req, res) =>{
    products.forEach((product, index) =>{
        if(product.id === req.params.id){
            products[index] = req.body;
            res.send(req.body);
        }
    });
});


app.get('/product/:id', (req, res) =>{
    for(let product of products){
        if(product.id === req.params.id){
            res.send(product);
        }
    }
});

app.get('/products', (req, res) => {
    res.send(products);
});

app.get('/', (req, res) => {
    res.send('Shopping List ');
});


app.listen(3001);