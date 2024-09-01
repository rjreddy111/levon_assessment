const express = require("express")
const router = express.Router()



router.post("/signup", async(request,response)=> {

    const {username,password,role} = request.body 
    
    try {
    const loginuser = 
    `INSERT INTO users (
     username,password,role)
     VALUES (?,?,?);
     `;
        await request.app.locals.db.run(loginuser,[username,password,role]);
        response.status(200).json({
            message:"User logged in successfully", 
            user: {username,role}
        })


    }
    catch (error) {
        response.status(500).json({error: "Error registering the user"})
    }
    



})


module.exports = router