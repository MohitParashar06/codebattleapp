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
