const express=require("express");
const router=express.Router()

//index
router.get("/",(req,res)=>{
    res.send("get for Post")
})

//show
router.get("/:id",(req,res)=>{
    res.send("get for show Posts")
})

//add new post
router.post("/",(req,res)=>{
    res.send("post for Posts")
})

//delete
router.delete("/:id",(req,res)=>{
    res.send("delete for Posts")
})

module.exports=router;