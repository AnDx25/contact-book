import React from 'react'

class Home extends React.Component
{
    constructor(){
        super()
    }
    handleOptionClick=(event,value)=>{
        console.log(event.target.value)
    }
    render(){
        return(
            <div>
                <div className="jumbotron">
            <h2>Home</h2>
            <p className="lead">Welcome to Home</p>
            {/* <button className="btn btn-raised btn-primary"  onClick={(e)=>this.handleOptionClick(e)}>Add Contact</button>
            <button className="btn btn-raised btn-primary"  onClick={(e)=>this.handleOptionClick(e)}>Update Contact</button>
            <button className="btn btn-raised btn-primary"   onClick={(e)=>this.handleOptionClick(e)}>View All</button>
            <button className="btn btn-raised btn-primary" onClick={(e)=>this.handleOptionClick(e)}>Delete</button> */}
        </div>
            <form> 

            </form>
            </div>
        
        )
    }
}

export default Home