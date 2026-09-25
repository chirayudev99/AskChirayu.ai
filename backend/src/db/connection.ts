import { connect,disconnect} from "mongoose";

async function connectToDB() {
    try {
        await connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log(error);
        
        throw new Error("Cannot connect to db")
    }
}

async function disconnectFromDB() {
    try {
        await disconnect()
    } catch (error) {
        console.log(error);
        throw new Error("Cannot disconnect from db")
    }
}

export {connectToDB,disconnectFromDB}