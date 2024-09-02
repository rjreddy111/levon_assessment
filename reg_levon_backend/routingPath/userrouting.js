const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()
const jwt = require("jsonwebtoken")



router.post("/signup", async(request,response)=> {

    const {username,password,role} = request.body 
    const hashPassword = await bcrypt.hash(password,10);
    console.log(hashPassword)
    const selectQuerry = `SELECT * FROM Users where username ='${username}'` ;
    const dbPresentUser = await request.app.locals.db.get(selectQuerry)

    if (dbPresentUser === undefined) {
        const createUser = `INSERT INTO Users (username,password,role)
        VALUES ('${username}', '${hashPassword}', '${role}')
        `;
        const dbResponse = await request.app.locals.db.run(createUser)
        const dbObject =JSON.stringify(dbResponse)
        console.log(dbObject)
        response.status(201).json({message:"New user created successfully"})
    }
    else {
        response.status(400).json({error:"User already exists"})    }
    
    



})


router.post("/login", async(request,response)=> {
    const {username,password} = request.body 
    console.log(password)
    const selectUser = `SELECT * FROM Users  where username = '${username}'`;
    const dbUserPresent = await request.app.locals.db.get(selectUser) 
    console.log(dbUserPresent)
    if (dbUserPresent===undefined) {
        response.status(400).json({error:"Invalid user"})
    }
    else {
        const isPasswordMatching = await bcrypt.compare(password,dbUserPresent.password);
        console.log(isPasswordMatching)
        if (isPasswordMatching===true) {

            const payload = {
                username:dbUserPresent.username, 
                role:dbUserPresent.role
            }
            const jwtToken = jwt.sign(payload, "My_secret_key")
            response.send({jwtToken,payload})
        }
        else { 
            response.status(401).json({error:"Invalid User"})
            
            
        }
    }
    
    




});


module.exports = router