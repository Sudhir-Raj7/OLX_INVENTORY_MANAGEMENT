import mongoose from "mongoose";

const connectToMongo = async ()=>{ 
    try {
        const res = await mongoose.connect("mongodb+srv://sudhirraj73:dbsudhirraj@cluster0.vlcqkyv.mongodb.net/");
          if(res){
            console.log("Database connected Successfully");
          }
    } catch (error) {
        console.log("error connection to db");
    }   
  
};
 export default connectToMongo;