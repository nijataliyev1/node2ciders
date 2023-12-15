const fs = require('fs');
const express = require('express');

const server = express();

server.get('/', (req, res) => {
    let data = fs.readFileSync('./Data.json', 'utf-8');
    res.send(data);
})

server.get('/product/:id', (req,res) => {
    let data = fs.readFileSync('./Data.json', 'utf-8');
    const selected = JSON.parse(data).find(item => item.id == req.params.id);
    if (selected) {
        res.send(selected);
    }
    else {
        res.status(404).send({Error: "Id is not defined!!!"})
    }
})

server.get('/products', (req,res) => {
    let data = fs.readFileSync('./Data.json', 'utf-8');
    console.log(req.query)
    console.log(data)
    const selected = JSON.parse(data).filter((item) => {
      return  Number(item.id) >= Number(req.query.count) && Number(item.id) <= Number(req.query.ofset);
    })

    res.send(selected);
})

server.listen(5000, () => {
    console.log("Succesed!!!")
})


