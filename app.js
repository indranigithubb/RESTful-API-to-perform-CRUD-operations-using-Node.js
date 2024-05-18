//CRUD OPERATIONS 
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const app = express();

//mongoose connect
mongoose.connect("mongodb://127.0.0.1:27017/Sample2").then(()=>{
    console.log("connected to mongoDB");
}).catch((err)=>{
    console.log(err);
});

//using body parser
app.use(bodyparser.urlencoded({extended : false}));
app.use(express.json());


//create schema 
const productSchema = new mongoose.Schema({
    name : String,
    description:String,
    price :Number

});

//create model
const Product = new mongoose.model("Product",productSchema);


//create API
app.post('/api/product/new',async(req,res)=>{
  const product =  await Product.create(req.body);

    res.status(201).json({
        success : true,
        product
    })
})

//read product
app.get('/api/allproducts',async(req,res)=>{
    const product =  await Product.find();
  
      res.status(200).json({
          success : true,
          product
      })
  })

//update product
app.put('/api/product/:id',async(req,res)=>{
    let product =  await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success : false,
            message :"product not found"
        })
    }


    product = await Product.findByIdAndUpdate(req.params.id, req.body,{new : true,useFindAndmodify:false, runValidators : true})

      res.status(200).json({
          success : true,
          product
      })
  })

  //delete product 
  app.delete('/api/product/:id',async(req,res)=>{
    let product =  await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success : false,
            message :"product not found"
        })
    }

    await Product.findByIdAndDelete(req.params.id);
  
      res.status(200).json({
          success : true,
          message :"product is deleted"
      })
  })

app.listen(4000,()=>{
    console.log("server is working at http://localhost:4000");
})