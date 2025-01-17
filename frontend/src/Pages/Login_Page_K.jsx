import React from 'react'
import toast from 'react-hot-toast'
import { useState } from 'react'
import NavBar_M from './NavBar_M'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { loginUser } from '../apicalls/userApi'
import { useNavigate } from 'react-router-dom'
const Login_Page_K = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      })
    
      const [showPassword, setShowPassword] = useState(false)
    
      const { email, password } = formData
    
      const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }
    
      const handleOnSubmit = async (e) => {
        e.preventDefault()
        const loginData = {
          email: email,
          password: password
        }
        // console.log('login data: ',loginData);

        try{
          const response = await loginUser(loginData)
          // console.log('response is: ', response);
          
          if(response.status === 200){
            localStorage.setItem('token', response.data.jwtToken)
            toast.success(response.data.message)
            navigate('/')

          }else{
            toast.error(response.data.message)
          }
          
        }catch(err){
          toast.error('Some error occured!!!')
        }
       
      }
  return (
    <div className="min-h-screen bg-gray-900 text-white">
   <NavBar_M></NavBar_M>
   <div className="flex"> 
    <div  className="mx-auto flex gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
        <div className="flex flex-col gap-5 mx-auto w-[450px] md:mx-0 border-2 border-white rounded-lg p-12" 
        > 
        <div>
        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-[#EA00FF]">
            Login
        </h1>
        <p className="mt-4 text-[1.125rem] leading-[1.625rem] italic text-blue-100">
            Join The Best Codding Community
        </p>
        </div>
        <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4"
    >
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem]">
          <b>Email Address</b> <sup className="text-purple-200">*</sup>
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
      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem]">
          <b>Password</b> <sup className="text-[#EA00FF]">*</sup>
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
          className="w-full rounded-[0.5rem] bg-gray-800 p-[12px] pr-12"
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
      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-[#EA00FF] py-[8px] px-[12px] font-medium hover:text-[#EA00FF] hover:bg-gray-200 transition duration-300" 
      >
        <b>Sign In</b>
      </button>
    </form>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Login_Page_K
