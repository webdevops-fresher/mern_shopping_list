const express=require('express');
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


app.listen(3001,()=>console.log('backend server running'));
