const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()
const jwt = require("jsonwebtoken")


const my_key ="My_secret_key"



const authentication = (request,response,next) => {
    let jwtToken  ; 
    const authHeader = request.headers["authorization"]
    console.log(authHeader)
    if (authHeader !==undefined) {
        jwtToken = authHeader.split(" ")[1]
        console.log("jwt token :",jwtToken)

    }
    if (jwtToken ===undefined){
        response.status(401);
        response.send("Invalid JWT Token")
    }
    else {
        jwt.verify(jwtToken, my_key,async(error,payload)=> {
            if (error){
                response.status(401).json({error:"Invalid JWT Token"})
            }
            else {
                request.username = payload.username
                next()
            }
        })
    }
}





router.get("/teachers", authentication, async(request,response)=> {
       const getStudents = `select * from Teachers INNER JOIN Users on Teachers.user_id=Users.user_id where Users.role="teacher"`
       const dbResponse = await request.app.locals.db.all(getStudents)
       response.send(dbResponse)

})

router.post("/teachers/post", authentication, async(request,response)=> {
    const {name,subject,user_id} = request.body 
    console.log(name,subject,user_id)
    const addTeacher = `INSERT INTO Teachers (
    name,subject,user_id
    )  
    VALUES ('${name}', '${subject}', ${user_id});
    `; 
    const dbResponse = await request.app.locals.db.run(addTeacher)
    console.log(dbResponse)
    response.send({message:"Teacher added successfully"})
})


module.exports = router