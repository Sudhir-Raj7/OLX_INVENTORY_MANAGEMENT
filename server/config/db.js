import mongoose from "mongoose";

const connectToMongo = async ()=>{ 
    try {
        const res = await mongoose.connect("mongodb+srv://dsudhirraj73:Matthewdb@olx-cluster.mc7ifx3.mongodb.net/?retryWrites=true&w=majority&appName=olx-cluster");
          if(res){
            console.log("Database connected Successfully");
          }
    } catch (error) {
        console.log("error connection to db",error);
    }   
  
};
 export default connectToMongo;