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
