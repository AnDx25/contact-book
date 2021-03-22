import React from 'react'

import {Link,withRouter} from 'react-router-dom'
import {signOut,isAuthenticated} from '../auth'
const isActive=(history,path)=>{
    if(history.location.pathname===path) return {color:"#ff9900"}
    else return {color:"#ffffff"}
}


// export const signOut=(next)=>{
//     if(typeof window!=="undefined")
//     {
//         localStorage.removeItem("jwt")
//     }
  
//     next()
//     return fetch("http://localhost:8080/sign-out",{
//         method:"GET"
//     })
//     .then((respose)=>{
//         console.log("signout",respose);
//         return respose.json();
//     })
//     .catch(error=>{
//         console.log(error)
//     })
    
// }

// export const isAuthenticated=()=>{
//     if(typeof window==="undefined")
//     {
//         return false;
//     }
//     if(localStorage.getItem("jwt")){
//         return JSON.parse(localStorage.getItem("jwt"))

//     }
//     else{
//         return false;
//     }
// }

const Menu=({history})=>(
    <div >
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
            <Link className="nav-link" style={isActive(history,"/")} to="/">Home</Link>
            </li>

            {
                !isAuthenticated() && (
                   
                    <>
                    <li className="nav-item">
                    <Link className="nav-link" style={isActive(history,"/sign-in")} to="/sign-in">SignIn</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history,"/sign-up")} to="/sign-up">SignUp</Link>
                     </li>
                    </>
                    
                )
            }

            {
                isAuthenticated() && (
                    <>
            <li className="nav-item">
            <Link className="nav-link" style={isActive(history,"/contact/add-contact")} to="/contact/add-contact">Add Contact</Link>
            </li>
            
            <li className="nav-item">
            <Link className="nav-link" style={isActive(history,"/contact")} to="/contact">View Contact</Link>
            </li>



            <li className="nav-item">
            <Link className="nav-link" style={isActive(history,"/contact/update-contact")} to="/contact/update-contact">Update Contact</Link>
            </li>

            <li className="nav-item">
            <Link className="nav-link" style={isActive(history,"/contact/delete-contact")} to="/contact/delete-contact">Delete Contact</Link>
            </li>
                    </>
                )
            }

            
        </ul>
        <ul class="nav   nav-tabs bg-primary justify-content-end">
            {   
                isAuthenticated() && (
                    <>
                         <li className="nav-item ">
                    <a
                    className="nav-link"
                    style={isActive(history,"/sign-up"),{cursor:'pointer',color:"#fff"}}
                    onClick={()=>signOut(()=>history.push('/'))}
                    >
                     SignOut
                     </a>
                </li>

                <li className="nav-item ">
                    <a
                    className="nav-link"
                    style={isActive(history,"/sign-up"),{cursor:'pointer',color:"#fff"}}
                    onClick={()=>{}}
                    >
                     {isAuthenticated().user.name}
                     </a>
                </li>
                    </>
                   
                )
            }
        </ul>
    </div>
)

export default withRouter(Menu);