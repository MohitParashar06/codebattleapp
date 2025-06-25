import React from 'react'

import axios from 'axios'

export const signUpUser = async (payload)=>{
    try{
        
        const data = await axios.post('http://localhost:3000/api/user/signup', payload)
        return data;
    }catch(err){
        console.log('err is: ',err);
        
        return err.response
    }
}

export const loginUser = async (payload)=>{
    try{
        // console.log('payload is: ', payload);
        
        const data = await axios.post('http://localhost:3000/api/user/login', payload)
        // console.log('data is: ', data);
        return data;

    }catch(err){
        return err.response;
        
    }
}
