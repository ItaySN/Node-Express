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

//Create a specify ID to the product
const idGenerator = ()=>{
    let idOfProduct = Math.floor(Math.random() * (1000000 - 100000 + 1)  + 100000);
    products.map(obj=>{
        if(obj.id===idOfProduct){
            idOfProduct = idGenerator();
        }
    });
    return idOfProduct.toString();
}


//Add a new product to the products list 
app.post('/product', (req, res) =>{
    req.body.id = idGenerator();
    products.push(req.body);
    res.send(req.body);
    
});

//Delete a specify product by ID
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

//Get a specify product by ID
app.get('/product/:id', (req, res) =>{
    for(let product of products){
        if(product.id === req.params.id){
            res.send(product);
        }
    }
});

//Get all the products list
app.get('/products', (req, res) => {
    res.send(products);
});


app.get('/', (req, res) => {
    res.send('Shopping List ');
});


app.listen(3001);