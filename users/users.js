const mg=require('mongoose')


const userschema=new mg.Schema({
    name:{
       type:String,
       required:true,
       trim:true 
    },
    rollno:{
        type:String,
        unique:true,
        require:true,
        trim:true,
        uppercase:true,
        validator(value){
            if(value.length<10){
                throw new Error('enter a valid rollnumber')
            }
        }
    },
    score:{
        type:Number,
        default:0
    }
})

const user=mg.model('user',userschema)

module.exports=user
