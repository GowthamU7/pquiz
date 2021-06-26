const exp=require('express')
const app=exp()
const port=process.env.PORT || 3000
const hbs=require('hbs')
const pt=require('path')
const qr=require('qrcode')
require('../mongo_boy/mongoose')
const user=require('../users/users')
const check=require('./candidate')
const public=pt.join(__dirname,'../public')
const par=pt.join(__dirname,'../partials')
app.set('view engine','hbs')
app.use(exp.static(public))

app.get('/',(req,res)=>{
    res.render('index')
})
hbs.registerPartials(par)
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
    const score=req.query.score
    const per=Math.ceil((score*100)/50)
    const mgs="you have scored "+score+" marks with a percentage of "+per+" thankyou...."
    await qr.toDataURL(mgs,(err,src)=>{
        if(err){
            return res.send("unable to send your score")
        }
        return res.render('submit',{src})
    })
    return 
})
app.listen(port,()=>{
    console.log('listening on port.......',port)
})