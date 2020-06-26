const mongoose=require('mongoose');
const schema=mongoose.Schema;
const itemSchema=new schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:String,
        default:(new Date()).toLocaleDateString()
    }
});

module.exports=Item=mongoose.model('item',itemSchema);

