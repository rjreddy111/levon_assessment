import {Component} from "react"
import {Link} from "react-router-dom"

import withRouter from  "../WrapperRouting/withRouter"

import "./index.css"

class SignUp extends Component {

    state = {
        userName : "", 
        password : "", 
        role:""
    }


  selectOption = (e)=> {
    this.setState({role:e.target.value})
  }

  getUsername = (e)=> {
    this.setState({userName:e.target.value})
  }

  getPassword = (e)=> {
    this.setState({password:e.target.value})
  }

  handleForm =async (e)=> {
    e.preventDefault()
    const {userName,password,role} = this.state
    const userDetails = {username:userName, password,role  }
    const url = "https://levon-assessment.onrender.com/levon/signup"
  
    const options = {
        method:"POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(userDetails)
    }
    const response = await fetch (url,options)
    const data = await response.json()
    console.log(data)
    if (response.ok ===true) {
       
        this.props.navigate("/levon/login")
        }
        
    }



  



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
                    <label>Choose Role </label>
                    <select onClick={this.selectOption} >
                        <option value = "student">Student</option>
                        <option value ="teacher">Teacher</option>
                    </select>
                    <div className="button-sontainer">
                    
                    <button className="signup-button" >Sign Up</button>
                    <button className="already-have-account" onClick={()=> this.props.navigate("/levon/login")}>Already Have Account?</button>
                    </div>

                </form>
            </div>
        )
    }
}







export default withRouter(SignUp)