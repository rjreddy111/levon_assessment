import { BrowserRouter,Routes,Route } from "react-router-dom";
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import './App.css';
import StudentComponent from "./components/StudentComponent";
import PostingDataStudent from "./components/PostingDataStudent";
import TeacherComponent from "./components/TeacherComponent";
import PostingDataTeacher from "./components/PostingDataTeacher";

const App = ()=> (

<BrowserRouter>
  <Routes>
    <Route path = "/levon/signup" element= {<SignUp/>}/> 
    <Route path = "/levon/login" element = {<Login/>} />
     <Route path = "/students/students" element={<StudentComponent/>}/>
     <Route path= "/students/students/post" element = {<PostingDataStudent/>}/>
     <Route path = "/teachers/teachers" element={<TeacherComponent/>}/>
     <Route path = "/teachers/teachers/post" element= {<PostingDataTeacher/>}/>
  </Routes>
</BrowserRouter>

)

export default App;
