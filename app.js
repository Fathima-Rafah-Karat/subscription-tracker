import express from "express";
import {PORT} from "./config/env.js";
import userRouder from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRuter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middlewares.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import workflowRouter from "./routes/wrokflow.routes.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(arcjetMiddleware);
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/user",userRouder);
app.use("/api/v1/subscription",subscriptionRuter);
app.use("/api/v1/workflows",workflowRouter);
app.use(errorMiddleware);
app.get("/", (req, res) => {
    res.send("welcome to subscription tracker");
});
app.listen(PORT,async () => {
     console.log(`subscription tracker API is running on http://localhost:${PORT}`) ;
     await connectToDatabase();
});

export default app;
