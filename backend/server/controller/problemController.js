
const {LeetCode} = require('leetcode-query')
const leetcode = new LeetCode();
require("dotenv").config();
const getProblemTitle = async(req,res)=>{
    try {
        const {limit, difficulty} = req.body;
        if(!difficulty){
            const problem = await leetcode.problems({limit:limit});
            const array = problem.questions;
            const response = {
                ques:[]
            }
            array.map((item)=>{
                response.ques.push({title:item.title, accRate:item.acRate, diff:item.difficulty})
            })
            return res.status(200).json({
                data:response
            })
        }
        else if(!limit){
            const problem = await leetcode.problems({filters:{difficulty:difficulty}})
            const array = problem.questions;
            const response = {
                ques:[]
            }
            array.map((item)=>{
                response.ques.push({title:item.title, accRate:item.acRate, diff:item.difficulty})
            })
            return res.status(200).json({
                data:response
            })
        }else{
            const problem = await leetcode.problems({ limit:limit !== null ? limit : 25, filters:{difficulty:difficulty}})
            const array = problem.questions;
            const response = {
                ques:[]
            }
            array.map((item)=>{
                response.ques.push({title:item.title, accRate:item.acRate, diff:item.difficulty})
            })
            return res.status(200).json({
                data:response
            })
        }

    } catch (error) {
        return res.status(500).json({
            message:"Internal Sever Error"
        })
    }
}

const getProblemWithGivenTitle = async (req,res)=>{
    try{

        const {title} = req.body;
        const problem = await leetcode.problem(title)
        if(!problem){
            return res.status(400).json({
                message:"Problem Not Found"
            })
        }
        return res.status(200).json({
            message:problem
        })
    }catch(err){
        return res.status(500).json({
            message:"Internal Sever Error"
        })
    }
}

module.exports = {
    getProblemTitle,
    getProblemWithGivenTitle
}