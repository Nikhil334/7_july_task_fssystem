require("dotenv").config();
const fs = require("fs");
const express = require("express");
const http = require("http");
const multer = require("multer");
const newfilepath=`./backup/Text_${Date.now()}.txt`;
//const upload = multer({ dest: 'uploads/' });



const app = express();

const port = process.env.PORT;
//const sk = process.env.secret_key;

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

// app.delete("/delete",(req,res)=>{
//     fs.unlink(./upload)
// })

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

app.post("/merge",(req,res)=>{
       const file1Path = "./uploads/abc.txt";
       const file2Path = "./uploads/xyz.txt";
      
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
})
app.post("/upload",uploading,(req,res)=>{
  //  console.log();
  //  const files = req.files;
   // console.log(req.file);
//    if (!files || files.length !== 2) {
//     return res.status(400).json({ error: 'Please upload two files.' });
//   }

//   const file1Path = files[0].path;
//   const file2Path = files[1].path;
//   const backupFilePath = 'backup/combined.txt';

//   // Read the content of file 1
//   const file1Content = fs.readFileSync(file1Path, 'utf8');
  
//   // Read the content of file 2
//   const file2Content = fs.readFileSync(file2Path, 'utf8');

//   // Append the contents of file 1 and file 2 to the backup file
//   fs.appendFileSync(backupFilePath, file1Content);
//   fs.appendFileSync(backupFilePath, file2Content);

   res.send("uploaded");
       
})
app.listen(port,(err)=>{
    console.log(`I am listening at port number ${port}`);
})



