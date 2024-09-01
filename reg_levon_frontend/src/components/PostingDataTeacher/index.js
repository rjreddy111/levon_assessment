import { Component } from "react";
import Cookies from "js-cookie"
import withRouter from "../WrapperRouting/withRouter";



class PostingDataTeacher extends Component {
  
    state= {
        name: "",
        subject:"",
        userId:""
    }

      getName = (e)=> {
        this.setState({name:e.target.value})
      }

      getSubject = (e)=> {
        this.setState({subject:e.target.value})
      }
      userID = (e)=> {
        this.setState({userId:e.target.value})
      }

    handleForm = async(e)=> {
        e.preventDefault()
        const {name,subject,userId} = this.state
        const jwToken = Cookies.get("jwt_token")
        const userDetails = {name,subject,user_id:userId}
        const url = "https://levon-assessment.onrender.com/teachers/teachers/post"
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
            this.props.navigate("/teachers/teachers")
        }
    }



    render(){
      
        const {name,subject,userId} = this.state 
        return(
            <div className="student-list-add">
                <form className="form-submission"  onSubmit={this.handleForm}> 
                    <div>
                        <label>name</label>
                    <input type = "text" value= {name} onChange={this.getName}  placeholder="Enter username" className="user-input" required  />  
                    </div>
                    
                    <br/>
                    <div>
                        <label>Subject</label>
                        <input type = "text" onChange={this.getSubject} value = {subject} placeholder="Enter subject" className="user-input" required />
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




export default withRouter(PostingDataTeacher)