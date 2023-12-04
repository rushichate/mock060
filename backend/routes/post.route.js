const express = require("express")
const { PostModel } = require("../modeles/post.model")
const postRouter = express.Router()

postRouter.get("/",async(req,res)=>{
    try{
        const posts = await PostModel.find()
        res.status(200).json(posts)

    }catch(error){
        res.status(400).json(error)
    }
})

postRouter.post("/add",async(req,res)=>{
    const {name,description,category,image,location,price} = req.body
    try{
      const newPost = new PostModel({name,description,category,image,location,price})
      await newPost.save()
      res.status(200).json({message:"Post added successfully"})
    }catch(error){
        res.status(400).json(error)
    }
})

postRouter.delete("/:id",async(req,res)=>{
    const {id} = req.params
    try{
          await PostModel.findByIdAndDelete(id)
          res.status(200).json({message:"Post deleted successfully"})
    }catch(error){
        res.status(400).json(error)
    }
})

postRouter.put("/:id",async(req,res)=>{
    try{
        const {id} = req.params
        const {name,description,category,image,location,price} = req.body
        const post = await PostModel.findById(id)
        post.name=name
        post.description=description
        post.category=category
        post.image=image
        post.location=location
        post.price=price

        await post.save()
        res.status(200).json({message:"Post updated successfully"})

    }catch(error){
        res.status(400).json(error)
    }
})


module.exports = {
    postRouter
}