// err is the information that happened before the request and what happens after the request  and  now ready to move next step is -next
const errorMiddleware=(err,req,res,next)=>{
   try{
      let error={...err};
      error.message=err.message;
      console.error(err);

    //   try of error 
    // mongoose bad objectId
    if(err.name==='castError'){
     const message ='resource not found';
     error=new Error(message);
     error.statusCode = 404; 
    }

    // mongoose duplicate key
    if(err.code===11000){
     const message='duplicate field value entered';
     error=new Error(message);
     error.statusCode = 400;  
    }
    
    // mongoose validation error
    if(err.name==='validationError'){
       const message=Object.values(err.errors).map(val=>val.message) ;
       error=new Error(message.join(','));
       error.statusCode=400;
    }
  

    res.status(error.statusCode ||500).json({success:false,error:error.message ||'server Error'});
    
   }catch(error) {
    next(error);
   }
};
export default errorMiddleware;