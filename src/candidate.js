var can={}


function check(rl){
    if(!can[rl]){
        can[rl]=true
    }
    else{
        return new Error('Your are out of your atttempts')
    }
    return null
}


module.exports=check