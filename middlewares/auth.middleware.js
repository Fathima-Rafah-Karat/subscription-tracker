import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";


// it used to protect our route
const authorize = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(' ')[1];
        }
        // if there is not token
        if (!token)  return res.status(401).json({ message: "unauthorized" });

        // get the token then verify it
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) return res.status(401).json({ message: "unauthorized" });
        req.user = user;
        next();
    
    }
    catch (error) {
        res.status(401).json({ message: "unauthorized", error: error.message });
    }
}
export default authorize;