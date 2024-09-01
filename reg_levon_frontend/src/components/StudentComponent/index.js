import { Component } from "react";
import Cookies from "js-cookie"
import { Link } from "react-router-dom";

import "./index.css"



class StudentComponent extends Component {

    state = {
        recievedData:[]
    }

    componentDidMount() {
        this.getStudents()
    }


    getStudents = async()=> {
        const jwtToken = Cookies.get("jwt_token")
        console.log(jwtToken)
        
        const url = "https://levon-assessment.onrender.com/students/students" 
        const options = {
                headers: {
                    "Authorization" : `Bearer ${jwtToken}`
                },
                method:"GET"
        }
            
            const response = await fetch (url,options)
            if (response.ok===true) {
                const fetchData = await response.json()
                console.log(fetchData)
                const updatedData = fetchData.map((eachData)=> ({
                    name: eachData.name, 
                    grade: eachData.grade,
                    studentId : eachData.student_id,
                    role:eachData.role
                    

                }))
                this.setState({recievedData:updatedData})

            }
             
        
        
        
    }

    render(){
        const {recievedData} = this.state
        console.log(recievedData)
        

        return (
             <div className="students-list_bg">
                
                <table  className="table">
                    <thead>
                        <tr>
                        <th >Name</th>
                        <th>Grade</th>
                        <th>Role</th>
                        </tr>

                    </thead>
                    <tbody>
                        {recievedData.map((eachData)=> (
                           <tr key = {eachData.studentId} className="table-row">
                            <td>{eachData.name}</td>
                            <td className="grade">{eachData.grade}</td>
                            <td className="grade">{eachData.role}</td>

                           </tr>
                              
                            
                        ))}
                        </tbody>
                   
                </table>
                <Link to ="/students/students/post">
                <button >Add stundent</button>
                </Link>
                </div>
           
        )
    }
}


export default StudentComponent