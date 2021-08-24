const express = require('express');
const firebase = require('firebase');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const app =express();
app.use(express.urlencoded({ extended: true}));
admin.initializeApp(functions.config().firebase)
app.use(express.json());
// var firebaseConfig = {
//     apiKey: "AIzaSyDWmq2e2G45fN1p3Q0qTj2sMPdzfoWqc98",
//     authDomain: "order-managment-a.firebaseapp.com",
//     projectId: "order-managment-a",
//     databaseURL:"https://order-managment-a-default-rtdb.europe-west1.firebasedatabase.app/",
//     storageBucket: "order-managment-a.appspot.com",
//     messagingSenderId: "560650612563",
//     appId: "1:560650612563:web:002b24f6d036b1675d3ba6"
//   };
// firebase.initializeApp(firebaseConfig);
exports.deleteOrder = functions.https.onRequest((req, res)=>{
    const currentTime= new Date().getTime()
    const thirtyMin = currentTime - 1800000
})

const addOrder=(e)=>{
    const db=firebase.database();
    console.log(e)
    db.ref('liveOrders/' + `${e.idDeal}`).set(e);
}

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods','GET, POST, DELETE, PUT');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})
app.post('/addNewOrder', (req, res)=>{
    res.status(200)?res.json('Sent Order Successfully'):res.json('Order didn\'t sent')
    const order={
        idPrinter: req.body.idPrinter,
        idDeal: req.body.idDeal,
        items: req.body.data,
        pricelist: req.body.pricelist,
        pricelistId: req.body.pricelistId,
        time:Date.now()
    }
    console.log(order)
    addOrder(order)
})
app.listen(10000, ()=>{
    console.log('Server Is Alive at 10000')
})