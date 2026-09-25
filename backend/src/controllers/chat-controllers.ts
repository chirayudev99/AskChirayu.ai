import { NextFunction, Request, Response } from "express"
import { configureGemini  } from "../config/openai-config.js"
import { portfolioContext } from "../config/portfolio-context.js"
import User from "../models/User.js"


// export const generateChatCompletion = async (req:Request,res:Response,next:NextFunction) => {
//     const {message} = req.body
//     try {
//         const user = await User.findById(res.locals.jwtData.id)
//         if(!user){
//     return res.status(401).json({message:"User not registered or token issue"})
//         }

//         //get chats

//         const chats = user.chats.map(({role,content}) => ({role,content
//         })) as ChatCompletionRequestMessage[]
//         chats.push({content:message,role:"user"})
//         user.chats.push({content:message,role:"user"})

//         //send all chats to openai
//     const config = configureOpenAI()
//     const openai = new OpenAIApi(config)
//     //get latest response
//         const chatResponse = await openai.createChatCompletion({model:"gpt-5.6-luna",messages:chats,max_tokens:500})
// user.chats.push(chatResponse.data.choices[0].message)
// await user.save()

  
//     return res.status(200).json({message:"OK",chats:user.chats})

//      } catch (error) {
        
        
//         return res.status(500).json({message:"Error",error:error.message})
//      }
//    }

export const generateChatCompletion = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { message } = req.body;
    const history = Array.isArray(req.body.history) ? req.body.history : [];

    try {
        const chats = history
            .filter((chat: { role?: string; content?: string }) =>
                (chat.role === "user" || chat.role === "assistant") && typeof chat.content === "string"
            )
            .slice(-12)
            .map((chat: { role: string; content: string }) => `${chat.role}: ${chat.content}`);
        chats.push(`user: ${message}`);

        // Configure Gemini
        const ai = configureGemini();

        const conversation = `${portfolioContext}\n\nCONVERSATION\n${chats.join("\n")}`;

        // Generate response
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: conversation,
            config: {
                maxOutputTokens: 500,
                temperature: 0.7
            }
        });

        const assistantMessage = response.text;

        return res.status(200).json({
            message: "OK",
            assistant: assistantMessage
        });

    } catch (error) {
        console.error("Gemini Error:", error);

        return res.status(500).json({
            message: "Error",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
};

   export const sendAllChats = async (req:Request,res:Response,next:NextFunction) => {
    try {
       const user = await User.findById(res.locals.jwtData.id)
       if(!user){
   return res.status(401).json({message:"User not registered or token issue"})
       }
   if(user._id.toString() !== res.locals.jwtData.id){
      return res.status(401).json({message:"Permission Error"})
   }
     
   return res.status(200).json({message:"OK",chats:user.chats,})
    } catch (error) {
       return res.status(200).json({message:"Error",error:error.message})
    }
   }

// type Chat = {
//         id: string;
//         role: string;
//         content: string;
//     }

   export const deleteChats = async (req:Request,res:Response,next:NextFunction) => {
    try {
       const user = await User.findById(res.locals.jwtData.id)
       if(!user){
   return res.status(401).json({message:"User not registered or token issue"})
       }
   if(user._id.toString() !== res.locals.jwtData.id){
      return res.status(401).json({message:"Permission Error"})
   }
//    @ts-ignore
     user.chats = []
     await user.save()
   return res.status(200).json({message:"OK"})
    } catch (error) {
       return res.status(200).json({message:"Error",error:error.message})
    }
   }