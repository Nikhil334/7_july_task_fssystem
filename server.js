require("dotenv").config();
const express = require("express");
const http = require("http");
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });



const app = express();

const port = process.env.PORT;
const sk = process.env.secret_key;

app.use(express.urlencoded({extended:false}));

app.post("/upload",upload.single("greeting"),(req,res)=>{
    console.log(req.body);
    console.log(req.file);
       
})
app.listen(port,(err)=>{
    console.log(`I am listening at port number ${port}`);
})



