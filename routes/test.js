var express = require('express')
var {v4:uuidv4} = require('uuid')

const router = express.Router()

let data  = []

router.get('/tests',(req,res)=>{
     res.send(data)
  
})

router.post('/createtests',(req,res)=>{
   try{
    const {name,email,age,hobby} = req.body
    const user = {id:uuidv4(),name,email,age,hobby}
    data.push(user)
    res.send("users add successfully")
   }catch(err){
    console.error(err)
    res.status(500).send("internal server error")
   }
})

router.get('/createtest/:id',(req,res)=>{
    const singleuser = data.filter((item)=>item.id === req.params.id)
      
    if(!singleuser){
      return res.status(404).send('user not found')
    }
    
    res.send(singleuser) 
})
router.delete('/createtest/:id',(req,res)=>{
      data = data.filter((item)=>item.id !== req.params.id)
    res.send("user delete successfully") 
})
router.put('/createtest/:id',(req,res)=>{
     const userUpdated = data.find((item)=>item.id === req.params.id)

      if(!userUpdated){
          return res.status(404).send('User not found')
      }
     userUpdated.name = req.body.name
     userUpdated.email = req.body.email
     userUpdated.age = req.body.age
     userUpdated.hobby = req.body.hobby

     res.send("user updated successfully")
})



module.exports = router