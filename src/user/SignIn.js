import React from 'react'
import { Redirect } from 'react-router';
import {signIn,authenticate} from '../auth'
class SignIn extends React.Component{
    constructor(){
        super();
        this.state={
           
            email:"",
            password:"",
            error:"",
            redirectTo:false,
            loading:false
        }
    }
    handleChange=(name)=>(event)=>{
        this.setState({
            error:""
        })
        this.setState({
            [name]:event.target.value
        })
    }
    // signIn=(user)=>{
    //     console.log(process.env.REACT_APP_API_URL)
    //     return fetch(`${process.env.REACT_APP_API_URL}/sign-in`,{
    //         method:"POST",
    //         headers:{
    //             Accept:"application/json",
    //             "Content-Type":"application/json"
    //         },
    //         body:JSON.stringify(user)

    //     })
    //     .then(response=>{
    //         return response.json()
    //     })
    //     .catch(err=>console.log(err))

    // }
    // authenticate(jwt,next)
    // {
    //     if(typeof window!=="undefined")
    //     {
    //         localStorage.setItem("jwt",JSON.stringify(jwt))
    //         next()
    //     }
    // }
    handleSubmit=(event)=>{
        this.setState({loading:true})
        event.preventDefault();
        const {email,password}=this.state;
        const user={
           
            email,
            password
        }
       signIn(user).then(data=>{
           if(data.error)
           {
            this.setState({error:data.error,loading:false})   
           } 

           else{
               //authenticate
            authenticate(data,()=>{
                   this.setState({redirectTo:true})
               })
               //redirect
               
           }
       })
    };

    signInForm=(email,password)=>(
        <form>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange("email")} type="email" className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input onChange={this.handleChange("password")} type="password" className="form-control"/>
                    </div>

                    <button className="btn btn-raised btn-primary" onClick={this.handleSubmit}>Submit</button>
                </form>
    )
    render(){
        const {email,password,error,redirectTo,loading}=this.state;
        if(redirectTo)
        {
            return <Redirect to="/"/>
        }
        return(
            <div className="container">
                
                <h2 className="mt-5 mb-5">SignIn</h2>

                {
                    error &&  (<div className="alert alert-danger">
                                    {error}
                            </div>)
                    
                }
                {
                    loading && (
                            <div className="jumbotron text-center">
                                <h2>Loading...</h2>
                            </div>
                    )
                }
                {this.signInForm(email,password)}
            </div>
        )
    }
}
export default SignIn



