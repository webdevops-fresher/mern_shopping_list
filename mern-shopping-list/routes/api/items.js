const express=require('express');
const router=express.Router();

const ItemModel=require('../../models/Item');


router.route('/').
get(async(request,response)=>{
    console.log('requested all items');
    let items=await ItemModel.find();
    if(items) response.status(200).json(items);
    else response.status(404).json({status:'Failed'});
})
.post(async(request,response)=>{
    const newItem=new ItemModel({...request.body});
    const result=await newItem.save();
    if(result) response.status(201).json(result);
    else response.status(404).json({status:'failed'})
});

router.route('/:id',async(request,response)=>{
    ItemModel.findById(request.params.id).then(item=>item.remove()
    .then(result=>response.status(200).json({result})))
    .catch(err=>response.status(404).json({status:'failed',message:'could not find or delete the item'}));
});

router.delete('/:id',async(request,response)=>{
    ItemModel.findByIdAndDelete(request.params.id)
    .then(res=>response.status(201).json(res))
    .catch(err=>response.status(404).json({status:'Failed'}));
})



module.exports=router;
