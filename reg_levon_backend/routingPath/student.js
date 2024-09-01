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





router.get("/students", authentication, async(request,response)=> {
       const getStudents = `select * from Students INNER JOIN Users on Students.user_id=Users.user_id where Users.role="student"` 
       const dbResponse = await request.app.locals.db.all(getStudents)
    
       response.send(dbResponse)


})

router.post("/students/post", authentication, async(request,response)=> {
    const {name,grade,user_id} = request.body 
    console.log(name,grade,user_id)
    const addStudent = `INSERT INTO Students (
    name,grade,user_id
    )  
    VALUES ('${name}', '${grade}',${user_id});
    `; 
    const dbResponse = await request.app.locals.db.run(addStudent)
    response.send({message:"Student added successfully",dbResponse})
})


module.exports = router