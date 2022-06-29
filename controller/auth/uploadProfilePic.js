import User from "../../model/User";
import upload from "../../util/upload";
import connect from "../../db/dbconnect";
import verifyAccessToken from "../../util/verifyAccessToken";

export default async function(req, res){
    try{
        await connect();
        const user = await verifyAccessToken(req, res);
        upload.single("pic");
        const profileImg = req.file.path;
        User.findOneAndUpdate({_id:user.id}, {profilePic:profileImg});
    }
    catch(e){
        console.log(e);
    }
}