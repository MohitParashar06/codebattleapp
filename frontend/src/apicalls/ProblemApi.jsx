import React from 'react'

import axios from 'axios'

export const getTitle = async()=>{
    try {
        const {data} = await axios.get("http://localhost:3000/api/problem/title")
        return data
    } catch (error) {
        return error.response
    }
}

export const getProblemWithGivenTitle=async(payload)=>{
    try {
        // console.log(payload);
        const {data} = await axios.post("http://localhost:3000/api/problem/ques",payload)
        return data
    } catch (error) {
        return error.response
    }
}