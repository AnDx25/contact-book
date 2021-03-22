import React from 'react'
class AddContact extends React.Component{
    constructor(){
        super();
        this.state={
            name:"",
            email:"",
            phoneNumber:"",
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
    addContact=(user)=>{
       
        return fetch(`${process.env.REACT_APP_API_URL}/contact/add-contact`,{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${JSON.parse(localStorage.getItem("jwt")).token}`
            },
            body:JSON.stringify(user)

        })
        .then(response=>{
            return response.json()
        })
        .catch(err=>console.log(err))

    }
    handleSubmit=(event)=>{
        event.preventDefault();
        const {name,email,phoneNumber}=this.state;
        const user={
            name,
            email,
            phoneNumber
        }
       
       this.addContact(user).then(data=>{
           if(data.error) this.setState({error:data.error})

           else
            this.setState({
            name:"",
            email:"",
            phoneNumber:"",
            error:"",
            open:true

            })
       })
    };

    addContactForm=(name,email,phoneNumber)=>(
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
                        <label className="text-muted">Phone Number</label>
                        <input onChange={this.handleChange("phoneNumber")} type="number" className="form-control"/>
                    </div>

                    <button className="btn btn-raised btn-primary" onClick={this.handleSubmit}>Submit</button>
                </form>
    )
    render(){
        const {name,email,phoneNumber,error,open}=this.state;
        return(
            <div className="container">
                
                <h2 className="mt-5 mb-5">Add Contact</h2>

                {
                    error &&  (<div className="alert alert-danger">
                                    {error}
                            </div>)
                    
                }
                {
                    open && (<div className="alert alert-info">
                        Contact Saved successfully
                    </div>)
                }
                {this.addContactForm(name,email,phoneNumber)}
            </div>
        )
    }
}
export default AddContact