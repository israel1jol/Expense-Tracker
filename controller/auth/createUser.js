import User from "../../model/User";
import bcrypt from "bcrypt";
import connect from "../../db/dbconnect";

export default async function(req, res){
    try{
        await connect();
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const username = req.body.username;
        const email = req.body.email;
        const hash = await bcrypt.hash(req.body.password, 10);
        User.create({firstname:firstname, lastname:lastname, email:email, username:username, password:hash}, (err, user) => {
            if(err){
                return res.status(403).json({"error":err})
            }
            return res.status(200).json(user);
        });
    }
    catch(e){
        console.log(e);
    }
}