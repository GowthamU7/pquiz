const exp=require('express')
const app=exp()
const port=process.env.PORT || 3000
const hbs=require('hbs')
const pt=require('path')
require('../mongo_boy/mongoose')
const user=require('../users/users')
const check=require('./candidate')
const public=pt.join(__dirname,'../public')
app.set('view engine','hbs')
app.use(exp.static(public))

app.get('/',(req,res)=>{
    res.render('index')
})
var id=""
app.get('/welcome',async(req,res)=>{
    const us=new user({name:req.query.name,rollno:req.query.roll,score:0})
    try{
        await us.save()
        id=us._id
        res.render('welcome')
    }catch(e){
        res.render('sorry')
    }
})
app.get('/submit',async(req,res)=>{
    await user.findByIdAndUpdate(id,{score:req.query.score})
    const per=Math.ceil((req.query.score*100)/50)
    res.render('submit',{score:req.query.score,per})
})
app.listen(port,()=>{
    console.log('listening on port.......',port)
})