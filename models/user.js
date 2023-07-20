const mongoose = require('mongoose')

const {ObjectId} = mongoose.Schema;

const userSchema= new mongoose.Schema({
    name: String,
    email:{

          type: String,
          require:true,
          index: true,

    },

    role:{
        type:String,
        default:"admin",
      
    },

    
    adress:String,
    //wishlist:[{type: ObjectId, ref:"Produc"}],


},
{timestamps:true}
);

module.exports=mongoose.model("User", userSchema);
