import mongoose from "mongoose";
const subscriptionSchema =new mongoose.Schema({
    name:{
    type:String,
    required:[true,"subscription name is required"],
    trim:true,
    maxLength:2,
    maxLength:100
    },
    price:{
        type:Number,
        required:[true,"subscription price is required"],
        min:[0,"price must be greater than 0"],
    },
    currency:{
        type:String,
        enum:['USD','EUR','GBP','INR'],
        default:'INR',
    },
    frequency:{
        type:String,
        enum:['daily','weekly','monthly','yearly'],
    },
    category:{
        type:String,
        enum:['sports','news','lifestyle','finance','other'],
        required:true,
    },
    paymentMethod:{
        type:String,
        required:true,
        trim:true,
    },
    status:{
        type:String,
        enum:['active','cancelled','expired'],
        default:'active',
    },
    startDate:{
        type:Date,
        required:true,
        validate:{
            validator:(value)=>value<=new Date(),
            message:"start date must be in the past",
        }
    },
    renewalDate:{
        type:Date,
        validate:{
            validator:function (value){
                value > this.startDate;
            },
            message:"renewal date must be after the start date",
        }
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
        index:true,
    }

},{timestamp:true});
// auto-calculate renewal date if missing
subscriptionSchema.pre('save',function(next){
  if(!this.renewalDate){
    const renewalperiods={
        daily:1,
        weekly:7,
        monthly:30,
        yearly:365,
    };
    this.renewalDate=new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate()+ renewalperiods[this.frequency]);
  }
//   auto-update the status if renewal date has passed
if(this.renewalDate<new Date()){
    this.status="expired";
}
next();
});
const subscription= mongoose.model("subscription",subscriptionSchema);
export default subscription;