import React from 'react'
import Menu from './core/Menu'
import {Route,Switch} from 'react-router-dom'
import Home from './core/Home'
import SignIn from './user/SignIn'
import SignUp from './user/SignUp'
import ViewContact from './contact/ViewContact'
import AddContact from './contact/AddContact'
import UpdateContact from './contact/UpdateContact'
import DeleteContact from './contact/DeleteContact'

const MainRouter=()=>{
    return(
        <div>
            <Menu/>
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/sign-up" component={SignUp}/>
            <Route exact path="/sign-in" component={SignIn}/>
            <Route exact path="/contact" component={ViewContact}/>
            <Route exact path="/contact/add-contact" component={AddContact}/>
            <Route  path="/contact/update/:id" component={UpdateContact}/>
            <Route  path="/contact/delete/:id" component={DeleteContact}/>
        </Switch>
    </div>
    ) 
    
}

export default MainRouter