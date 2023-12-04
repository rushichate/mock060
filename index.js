const express = require("express")
require("dotenv").config()
const cors = require("cors")
const { connection } = require("./db")
const { userRouter } = require("./backend/routes/user.route")
const { verify } = require("./backend/middleware/authorize")
const { postRouter } = require("./backend/routes/post.route")
const app = express()

app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.json({messege:"Welcome To OLX APP"})
})
app.use("/users",userRouter)
app.use(verify)
app.use("/posts",postRouter)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log(`Connected to DB and running on port ${process.env.port}`)
    }catch(error){
        console.log(error)
    }
})