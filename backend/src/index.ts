import app from "./app.js"
import { connectToDB } from "./db/connection.js"

const PORT = process.env.PORT || 5000
//connections
connectToDB().then(() => {
  app.listen(PORT,() =>  console.log("Server Running & Db connected"))
}).catch(err => console.log(err)
)
