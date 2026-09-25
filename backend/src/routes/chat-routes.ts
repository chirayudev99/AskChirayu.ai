import express from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatValidator, validate } from "../utils/validators.js";
import { deleteChats, generateChatCompletion, sendAllChats } from "../controllers/chat-controllers.js";

const chatRoutes = express.Router()

//protected API

chatRoutes.post("/new",validate(chatValidator),generateChatCompletion)

chatRoutes.get("/all-chats",verifyToken,sendAllChats)

chatRoutes.delete("/delete",verifyToken,deleteChats)

export default chatRoutes