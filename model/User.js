import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstname: {type:String},
    lastname: {type:String},
    username: {type:String},
    email: {type:String, unique:true},
    password: {type:String},
    profilePic: {type:String, default:""}
}, {timestamps:true});

export default mongoose.models.User || mongoose.model("User", UserSchema);