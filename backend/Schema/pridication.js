const {Schema} = require("mongoose")
const {userModel} = require("../Model/userModel")


const pridicationSchema  = new Schema({
     conductivity:Number,
        oxygen:Number,
        methane:Number,
        ammonia:Number,
        disease:String,
        percentage:Number,
        createdAt: { type: Date, default: Date.now, },
        owner: {
         type: Schema.Types.ObjectId,
        ref: "user"
  },
  
    
  

},{

  timestamps:true
}
);


module.exports = {pridicationSchema};