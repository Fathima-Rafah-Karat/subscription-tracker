
import { SERVER_URL } from "../config/env.js";
import { WorkflowClient } from "../config/upstash.js";
import subscription from "../models/subscription.model.js";

 export const createSubscription =async(req,res,next)=>{
  
   
    try{
     const Subscription=await subscription.create({
        ...req.body,
        user:req.user._id,
     });
     console.log("sub", Subscription.id);
     
     await WorkflowClient.trigger({
      url:`${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body:{
         subscriptionId:Subscription.id,
      },
     
        
      headers:{
         'content-type':'application/json',
      },
     
      retries:0,
     })
      console.log("subsc");
     res.status(201).json({success:true,data:Subscription});
    }
    catch(error){      
        next(error);
    }
 }
 export const getUserSubscription = async(req,res,next)=>{
    try{
        // check if the user is the same as the one in the token
       if(req.user.id !=req.params.id){
        const  error= new Error("you are not the owner of this account");
        error.status=401;
        throw error;
       }
       const subscription=await subscription.find({user:req.params.id});
       req.status(200).json({success:true,data:subscription});
    }
    catch(error){
      next(error);

    }
 }