import React from 'react'

class DeleteContact extends React.Component
{
    constructor(){
        super()
    }
    componentDidMount(){
        return fetch(`${process.env.REACT_APP_API_URL}/contact/delete-contact/${this.props.match.params.id}`,{
            method:"DELETE",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${JSON.parse(localStorage.getItem("jwt")).token}`
            },
            
            
            

        })
        .then(response=>{
          
            return response.json()

        })
        .catch(err=>console.log(err))
    }
    render(){
        return(
            <div>
              <h3 className="mt-5 mb-5">Contact with id {this.props.match.params.id} deleted successfully</h3>
            </div>
        )
    }
}

export default DeleteContact;