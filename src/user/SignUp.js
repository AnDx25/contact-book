import React from 'react'
import {signUp} from '../auth'
class SignUp extends React.Component{
    constructor(){
        super();
        this.state={
            name:"",
            email:"",
            password:"",
            error:"",
            open:false
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
    // signUp=(user)=>{
    //     return fetch("http://localhost:8080/sign-up",{
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
    handleSubmit=(event)=>{
        event.preventDefault();
        const {name,email,password}=this.state;
        const user={
            name,
            email,
            password
        }
       signUp(user).then(data=>{
           if(data.error) this.setState({error:data.error})

           else
            this.setState({
            name:"",
            email:"",
            password:"",
            error:"",
            open:true

            })
       })
    };

    signUpForm=(name,email,password)=>(
        <form>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input onChange={this.handleChange("name")} type="text" className="form-control"/>
                    </div>

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
        const {name,email,password,error,open}=this.state;
        return(
            <div className="container">
                
                <h2 className="mt-5 mb-5">SignUp</h2>

                {
                    error &&  (<div className="alert alert-danger">
                                    {error}
                            </div>)
                    
                }
                {
                    open && (<div className="alert alert-info">
                        New Account is successfully created. Please Sign In
                    </div>)
                }
                {this.signUpForm(name,email,password)}
            </div>
        )
    }
}
export default SignUp