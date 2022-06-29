import refreshToken from "./refreshToken";
import connect from "../../db/dbconnect";

export default async function(req, res){
    try{
        await connect();
        const data = await refreshToken(req, res);
        if(data.error){
            return res.json(data);
        }
        return res.json({"refToken":data.hash});
    }
    catch(e){
        console.log(e);
    }
}