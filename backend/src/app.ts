import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config} from "dotenv";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";


config()
const app = express()

//health
app.use("/health",(req,res) => {
    return res.status(200).json({message:"healthy"})
})

//middewares
app.use(cors({origin:process.env.CORS_ORIGIN,credentials:true}))
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(morgan("dev"))
app.use("/api/v1",appRouter)

export default app

