const express = require('express');
const app = express();

app.use(express.json());

let products = [
    {
        id:'Iphone',
        author: 'Itay',
        content: 'Very good post'
    },
    {
        id:'Galaxy',
        author: 'Ofir Simhi',
        content: 'Very bad post'
    }
];


app.post('/product', (req, res) =>{
    console.log(req.body);
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
            res.send(post);
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