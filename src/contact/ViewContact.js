import React from 'react'
// import { listenerCount } from '../../../nodeapi/models/user.model'
import {Link} from 'react-router-dom'
class ViewContact extends React.Component
{
    constructor(){
        super()
        this.state={
            contacts:[]
        }
    }
     list=()=>{
        return fetch(`${process.env.REACT_APP_API_URL}/contact`,{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
                Authorization:`Bearer ${JSON.parse(localStorage.getItem("jwt")).token}`
            }
        })
    }
    componentDidMount(){
      this.list()
        .then(response=>response.json())
        .then(data=>data)
        .then(message=>{ 
            this.setState({
                contacts:message.message
            },
            ()=>{ }
           )
            })
           
    }
    renderContacts=(contacts)=>(
        
        <div className="row">
           
            {
                contacts.map((contact,i)=>(
                   
                    <div className="card cil-md-4" key={i}>
                        <div className="card-body">
                            <h5 className="card-title">{contact.name}</h5>
                            <p>{contact.email}</p>
                            <p>{contact.phoneNumber}</p>
                            <Link to={`/contact/update/${contact._id}`}
                            className="btn btn-raised btn-primary btn-sm"
                            >
                                Edit
                            </Link>

                            <Link to={`/contact/delete/${contact._id}`}
                            className="btn btn-raised btn-primary btn-sm"
                            >
                                Delete
                            </Link>
                        </div>
                    </div>
                ))
            }
        </div>
    )
    render(){
        const {contacts}=this.state;
        return(
            <div className="conatiner">
                <h2 className="mt-5 mb-5">Contacts</h2>
                {
                 contacts.length>0 &&    
                this.renderContacts(contacts)
                }
            </div>
        )
    }
}

export default ViewContact;