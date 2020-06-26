const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});



const app=express();
const items=require('./routes/api/items');

app.use(express.json()); // or app.use(bodyParser.json())
app.use(cors());

//mongodb atlas DB 
const DB=process.env.DATABASE;

mongoose.connect(DB,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false,useCreateIndex:true})
.then(connection=>console.log('mongodb atlas cluster connected'))
.catch(err=>console.log(err));

app.use('/api/items',items);

//serve static files if in production
if(process.env.NODE_DEV=='production'){
    app.use(express.static('client/build'));
    app.get('*',(request,response)=>{
        response.send(path.resolve(__dirname,'client','build','index.html'));
    });
}


app.listen(3001,()=>console.log('backend server running'));
