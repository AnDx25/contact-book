export const signUp=(user)=>{
    
    return fetch(`${process.env.REACT_APP_API_URL}/sign-up`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)

    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))

}

export const signIn=(user)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/sign-in`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)

    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))

}

export const  authenticate=(jwt,next)=>
{
    if(typeof window!=="undefined")
    {
        localStorage.setItem("jwt",JSON.stringify(jwt))
        next()
    }
}

export const signOut=(next)=>{
    if(typeof window!=="undefined")
    {
        localStorage.removeItem("jwt")
    }
  
    next()
    return fetch(`${process.env.REACT_APP_API_URL}/sign-out`,{
        method:"GET"
    })
    .then((response)=>{
        console.log("signout",response);
        return response.json();
    })
    .catch(error=>{
        console.log(error)
    })
    
}

export const isAuthenticated=()=>{
    if(typeof window==="undefined")
    {
        return false;
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))

    }
    else{
        return false;
    }
}