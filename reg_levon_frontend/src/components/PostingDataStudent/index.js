import { Component } from "react";
import Cookies from "js-cookie"
import withRouter from "../WrapperRouting/withRouter";

import "./index.css"


class PostingDataStudent extends Component {
  
    state= {
        name: "",
        grade:"",
        userId:""
    }

      getName = (e)=> {
        this.setState({name:e.target.value})
      }

      getGrade = (e)=> {
        this.setState({grade:e.target.value})
      }
      userID = (e)=> {
        this.setState({userId:e.target.value})
      }

    handleForm = async(e)=> {
        e.preventDefault()
        const {name,grade,userId} = this.state
        const jwToken = Cookies.get("jwt_token")
        const userDetails = {name,grade,user_id:userId}
        const url = "https://levon-assessment.onrender.com/students/students/post"
        const options = {
            method:"POST",
            headers : {
                "Content-Type":"application/json",
                "Authorization":`Bearer ${jwToken}` 
            },
            body : JSON.stringify(userDetails)
        }
        const response = await fetch (url,options)
        console.log(response)
        if (response.ok===true) {
            this.props.navigate("/students/students")
        }
    }



    render(){
        const {role} = this.props 
        console.log(`Role choosed:${role}`)
        const {name,grade,userId} = this.state 
        return(
            <div className="student-list-add">
                <form className="form-submission"  onSubmit={this.handleForm}> 
                    <div>
                        <label>name</label>
                    <input type = "text" value= {name} onChange={this.getName}  placeholder="Enter username" className="user-input" required  />  
                    </div>
                    
                    <br/>
                    <div>
                        <label>grade</label>
                        <input type = "text" onChange={this.getGrade} value = {grade} placeholder="Enter Grade" className="user-input" required />
                    </div>
                    <br/>
                    <div>
                        <label>userId</label>
                        <input type = "text" onChange={this.userID} value = {userId} placeholder="Enter userid" className="user-input" required />
                    </div>
                    
                    <div className="button-sontainer">
                    
                    <button className="signup-button" >Add to list</button>
               
                    </div>

                </form>

            </div>
        )
    }

}




export default withRouter(PostingDataStudent)