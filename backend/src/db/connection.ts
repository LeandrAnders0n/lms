import {connect,disconnect} from "mongoose";
async function connectToDatabase() {
    try {
      await connect("mongodb://localhost:27017/learn");
    } catch (error) {
      console.log(error);
      throw new Error("Could not Connect to MongoDB");
    }
  }  

async function disconnectFromDatabase() {
    try{
        await disconnect();
    }catch(error){
        console.log(error);
        throw new Error("Could not Disconnect from MongoDB")
    }
}

export{connectToDatabase,disconnectFromDatabase};