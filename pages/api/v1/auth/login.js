import login from "../../../../controller/auth/login";

export default async function handler(req, res){
    if(req.method === "POST"){
        return login(req, res);
    }
    else{
        return res.status(404).send(`Cannot ${req.method} login`);
    }
}