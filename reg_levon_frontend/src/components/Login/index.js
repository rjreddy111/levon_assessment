import {Component} from "react"

import Cookies from "js-cookie"

import withRouter from "../WrapperRouting/withRouter"

import "./index.css"

class Login extends Component {

    state = {
        userName : "", 
        password : ""
        
    }




  getUsername = (e)=> {
    this.setState({userName:e.target.value})
  }

  getPassword = (e)=> {
    this.setState({password:e.target.value})
  }

 onSubmitSuccess =(jwtToken,role)=> {
    const {navigate} = this.props
    Cookies.set("jwt_token", jwtToken, {expires:30})
    if (role === "student"){
      return navigate("/students/students")
    } 
    return navigate("/teachers/teachers")
 }


  handleForm =async (e)=> {
    e.preventDefault()
    const {userName,password} = this.state
    const userDetails = {username:userName, password }
    const url = "https://levon-assessment.onrender.com/levon/login"
  
    const options = {
        method:"POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(userDetails)
    }
    const response = await fetch (url,options)
    const data = await response.json()
    const payload = data.payload 
    
   
    if (response.ok === true) {
        console.log(`data: ${data}`)
        this.onSubmitSuccess(data.jwtToken,payload.role)
    }



  };



    render(){
        const {userName,password,role} = this.state
        console.log(userName,password,role)
        return (
            <div className="user-sign-main-bg">
                <form className="form-container" onSubmit={this.handleForm}> 
                    <div>
                        <label>Username</label>
                    <input type = "text" value= {userName} onChange={this.getUsername}  placeholder="Enter username" className="user-input" required  />  
                    </div>
                    
                    <br/>
                    <div>
                        <label>Password</label>
                        <input type = "password" onChange={this.getPassword} value = {password} placeholder="Enter Password" className="user-input" required />
                    </div>
                    <br/>
                   
                    <div className="button-sontainer">
                    
                    <button className="signup-button" >Sign In</button>
                    <button className="already-have-account">Dont Have Account?</button>
                    </div>

                </form>
            </div>
        )
    }
}









export default withRouter(Login)