import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = { conn:null, promise:null };
}

const connect = async () => {
    if(cached.conn){
        return cached.conn;
    }

    if(!cached.promise){
        cached.promise = mongoose.connect(uri, {useNewUrlParser:true, bufferCommands:false}).then(mongoose => {
            return mongoose;
        })
    }

    cached.conn = await cached.promise
    return cached.conn;
}

export default connect;