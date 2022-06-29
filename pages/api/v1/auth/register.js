import createUser from "../../../../controller/auth/createUser";

export default function handler(req, res){
    if(req.method === "POST"){
        createUser(req, res);
    }
    else{
        return res.status(404).send(`Cannot ${req.method} /register`);
    }
}