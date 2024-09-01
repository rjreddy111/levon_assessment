const express = require("express")
const path = require("path")
const {open} = require("sqlite")
const cors = require("cors")
const sqlite3 = require("sqlite3")



const app = express()

app.use(cors())

app.use(express.json())



const routerPath = require("./routingPath/userrouting")
const routerStudent = require("./routingPath/student")
const routerTeacher = require("./routingPath/teacher")

const dbPath = path.join(__dirname,"databaseFile.db");
console.log(dbPath)

let db = null 
const initializeServer = async()=> {
   
    try {
        db =  await open({
        filename:dbPath, 
        driver: sqlite3.Database
    })

    await db.exec (`
        CREATE TABLE IF NOT EXISTS Users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT, 
        username TEXT UNIQUE NOT NULL, 
        password TEXT NOT NULL, 
        role TEXT CHECK(role IN ('student','teacher')) NOT NULL
        ) `); 

     
    
        await db.exec (`
            CREATE TABLE IF NOT EXISTS  Students (
            student_id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT NOT NULL, 
            grade text NOT NULL,

            user_id  INTEGER  , 
            FOREIGN KEY (user_id) REFERENCES Users(user_id)
            )
            `);
        

        await db.exec (
                `CREATE TABLE IF NOT EXISTS Teachers (
                teacher_id INTEGER PRIMARY KEY AUTOINCREMENT , 
                name TEXT NOT NULL, 
                subject TEXT NOT NULL, 
                user_id INTEGER , 
                FOREIGN KEY (user_id) REFERENCES Users(user_id)
                )`
            );

            app.locals.db = db

            app.listen(5001,()=> {
                console.log("server is running on 5001")
            })



}
  catch (error) {
    console.log(`DB Error: ${error.message}`)
    process.exit(1)
  }
}





initializeServer()



app.use("/levon",routerPath )
app.use("/students",routerStudent )
app.use("/teachers", routerTeacher)



module.exports = app