import React from 'react'
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar_M from './NavBar_M'
import { signUpUser } from '../apicalls/userApi'

const Signup_Page_K = () => {
  const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstName: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
    
      const [showPassword, setShowPassword] = useState(false)
      const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    
      const { firstName, email, password, confirmPassword } = formData

      const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }
      const handleOnSubmit = async (e) => {
        e.preventDefault()
    
        if (password !== confirmPassword) {
          toast.error("Passwords Do Not Match")
          return
        }
        console.log("yes");
        const signupData = {
          name:firstName,
          email,
          password
        }
        // console.log(signupData);
        setFormData({
          firstName: "",
          email: "",
          password: "",
          confirmPassword: "",
        })
        try {
          const response = await signUpUser(signupData)
          // console.log('response data is : ', response.status)
          if(response.status === 200){
            localStorage.setItem('token', response.data.jwtToken)
            toast.success("Account Created Successfully")
            navigate('/')
          }
          else{
            toast.error(response.data.message)
          }
        } catch (error) {
          toast.error('Some error occured!!!!')
        }
        
      }
  return (
<div className="min-h-screen bg-gray-900 text-white">
   <NavBar_M></NavBar_M>
   <div className="flex"> 
    <div  className="mx-auto flex gap-y-12 py-9 md:flex-row md:gap-y-0 md:gap-x-12 ">
        <div className="flex flex-col gap-10 mx-auto max-w-[450px] md:mx-0 border-2 border-white rounded-lg p-9 shadow-[0 35px 60px -15px rgba(191,68,245,1)]"
        > 
        <div>
        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem text-[#EA00FF]">
              Sign Up
        </h1>
        <p className="mt-4 text-[1.125rem] leading-[1.625rem] italic text-blue-100">
            Join The Best Codding Community
        </p>
        </div>
        <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem]">
              <b>User Name</b> <sup className="text-[#EA00FF]">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter username"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-gray-800 p-[12px]"
            />
          </label>
        </div>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem]">
            <b>Email Address</b> <sup className="text-[#EA00FF]">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-gray-800 p-[12px]"
          />
        </label>
        <div className="flex gap-x-4">
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem]">
              <b>Create Password</b> <sup className="text-[#EA00FF]">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-gray-800 p-[12px] pr-10"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem]">
              <b>Confirm Password</b> <sup className="text-[#EA00FF]">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-gray-800 p-[12px] pr-10"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-[#EA00FF] py-[8px] px-[12px] font-medium hover:text-[#EA00FF] hover:bg-gray-200 transition duration-300"
        >
          <b>Create Account</b>
        </button>
      </form>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Signup_Page_K
