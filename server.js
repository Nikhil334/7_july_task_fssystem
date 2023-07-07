require("dotenv").config();
const fs = require("fs");
const express = require("express");;
const multer = require("multer");
const newfilepath=`./backup/Text_${Date.now()}.txt`;

//const upload = multer({ dest: 'uploads/' });



const app = express();

const port = process.env.PORT;


app.use(express.urlencoded({extended:false}));



const uploading = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, 'uploads');
        },
        filename: function(req, file, cb){
            
            cb(null,`file${file.fieldname}.txt`);
        }
    })
}).any();



app.delete("/delete/:no1/:no2",(req,res)=>{
    fs.unlink(`./uploads/file${req.params.no1}.txt`,(err)=>{
        console.log("deleted")
    });
    fs.unlink(`./uploads/file${req.params.no2}.txt`,(err)=>{
        console.log("deleted");
    });
    res.send("Deleted successfully !");
})


app.get("/display",(req,res)=>{
    fs.readFile(newfilepath,(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    })
    
})


app.post("/merge/:no1/:no2",(req,res)=>{
       const file1Path = `./uploads/file${req.params.no1}.txt`;
       const file2Path = `./uploads/file${req.params.no2}.txt`;

      
       fs.readFile(file1Path,(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            fs.writeFile(newfilepath,data,(err)=>{
                if(err){
                    console.log(err);
                }
            });
            fs.readFile(file2Path,(err,data)=>{
                if(err){
                    console.log(err);
                }
                else{
                    fs.appendFile(newfilepath,` ${data}`,(err)=>{
                        if(err){
                            console.log(err);
                        }
                    });
                    
                }
                console.log("new file created");
                res.send("new file created");
               })
            
        }
       })
});


app.post("/upload",uploading,(req,res)=>{
   res.send("uploaded");
       
});


app.listen(port,(err)=>{
    console.log(`I am listening at port number ${port}`);
})



