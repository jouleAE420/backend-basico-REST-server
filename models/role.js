const {Schema,model}=require('mongoose')

const RoleSchema=Schema({
    rol:{
        type:String,
        requried:[true,"El rol es obligatorio"]
    }
})


module.exports=model('Rol',RoleSchema)