require("dotenv").config();
const express = require("express");
const http = require("http");
const homefile = require("./routes/home");
const registerfile = require("./routes/register");
const updatefile = require("./routes/update");
const deletefile = require("./routes/deletedata");
const patchfile = require("./routes/patch");
const {authtoken} = require("./middleware/middlemsg");
const calcfile = require("./routes/calcfile");
const calcobj = require("./controllers/operations");
const { updatevalidation } = require("./middleware/patchvalidation");
const { putvalidation } = require("./middleware/putvalidation");

const app = express();

console.log(http.STATUS_CODES);
const port = process.env.PORT;
const sk = process.env.secret_key;

app.use(express.json());

app.get("/",(req,res)=>{
    homefile.home(res);
});


app.post("/register",authtoken,(req,res)=>{
    registerfile.register(req.body,res);
});

app.put("/update/:id",putvalidation,(req,res)=>{
    const id = Number(req.params.id);
    updatefile.update(req.body,res,id);
});

app.patch("/update/:id",updatevalidation,(req,res)=>{
    const id = Number(req.params.id);
    patchfile.update2(req.body,res,id);
});

app.delete("/delete",(req,res)=>{
    deletefile.deletedata(req.body,res);
});

app.get("/calculator",(req,res)=>{
    calcfile.calculator(calcobj);
})

app.listen(port,(err)=>{
    console.log(`I am listening at port number ${port}`);
})



