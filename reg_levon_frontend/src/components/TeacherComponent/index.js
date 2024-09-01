import { Component } from "react";
import Cookies from "js-cookie"
import { Link } from "react-router-dom";





class TeacherComponent extends Component {

    state = {
        recievedData:[]
    }

    componentDidMount() {
        this.getStudents()
    }


    getStudents = async()=> {
        const jwtToken = Cookies.get("jwt_token")
        console.log(jwtToken)
        
        const url = "https://levon-assessment.onrender.com/teachers/teachers" 
        const options = {
                headers: {
                    "Authorization" : `Bearer ${jwtToken}`
                },
                method:"GET"
        }
            
            const response = await fetch (url,options)
            console.log(response)
            if (response.ok===true) {
                const fetchData = await response.json()
                console.log(fetchData)
                const updatedData = fetchData.map((eachData)=> ({
                    name: eachData.name, 
                    subject: eachData.subject,
                    teacherId : eachData.teacher_id,
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
                        <th>Subject</th>
                        <th>Role</th>
                        </tr>

                    </thead>
                    <tbody>
                        {recievedData.map((eachData)=> (
                           <tr key = {eachData.teacherId} className="table-row">
                            <td>{eachData.name}</td>
                            <td className="grade">{eachData.subject}</td>
                            <td className="grade">{eachData.role}</td>

                           </tr>
                              
                            
                        ))}
                        </tbody>
                   
                </table>
                <Link to ="/teachers/teachers/post">
                <button >Add Teacher</button>
                </Link>
                </div>
           
        )
    }
}


export default TeacherComponent