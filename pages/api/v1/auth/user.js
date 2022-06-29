import userInfo from "../../../../controller/auth/userInfo";

export default async function handler(req, res){
    if(req.method === "POST"){
        userInfo(req, res);
    }
    else{
       return res.status(404).send(`Cannot ${req.method} /user`);
    }
}