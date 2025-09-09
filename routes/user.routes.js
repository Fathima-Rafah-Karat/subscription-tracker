import {Router} from "express";
import { getUser,getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";
const userRouter=Router();
userRouter.get("/",getUsers);
// if we want to get the details of single users
userRouter.get("/:id",authorize,getUser);
// if we want to create new
userRouter.post("/",(req,res)=>res.send({title:"create new user"}));
// if we want to update  single user
userRouter.put("/:id",(req,res)=>res.send({title:"update the user"}));
// if we want to delete 
userRouter.delete("/:id",(req,res)=>res.send({title:"delete the user"}));
export default userRouter;