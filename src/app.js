const exp=require('express')
const app=exp()
const port=process.env.PORT || 3000
const hbs=require('hbs')
const pt=require('path')
const public=pt.join(__dirname,'../public')
app.set('view engine','hbs')
app.use(exp.static(public))

app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/welcome',(req,res)=>{
    res.render('welcome',{
        name:req.query.name.toUpperCase()
    })
})
app.listen(port,()=>{
    console.log('listening on port.......',port)
})