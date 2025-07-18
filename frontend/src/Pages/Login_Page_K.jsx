import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'
import NavBar_M from './NavBar_M'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { loginUser } from '../apicalls/userApi'

const Login_Page_K = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const { email, password } = formData
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setAlreadyLoggedIn(true)
    }
  }, [])

  const handleOnChange = (e) => {
    setFormData(prevData => ({ ...prevData, [e.target.name]: e.target.value }))
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    if (alreadyLoggedIn) return
    try {
      const response = await loginUser({ email, password })
      if(response.status === 200){
        localStorage.setItem('token', response.data.jwtToken)
        toast.success(response.data.message)
        navigate('/')
      } else {
        toast.error(response.data.message)
      }
    } catch (err) {
      toast.error('Some error occurred!')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar_M />
      <div className="flex">
        <div className="mx-auto flex gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
          <div className="flex flex-col gap-5 mx-auto w-[450px] md:mx-0 border-2 border-white rounded-lg p-12">
            <div>
              <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-[#EA00FF]">
                Login
              </h1>
              <p className="mt-4 text-[1.125rem] leading-[1.625rem] italic text-blue-100">
                Join The Best Coding Community
              </p>
            </div>
            {alreadyLoggedIn ? (
              <div className="bg-green-900 text-green-200 rounded p-4 flex flex-col items-center">
                <div className="mb-2 font-semibold">You are already logged in!</div>
                <button
                  onClick={() => navigate('/')}
                  className="bg-[#EA00FF] text-black px-4 py-2 rounded-lg font-semibold hover:bg-pink-500 transition"
                >
                  Go to Home
                </button>
              </div>
            ) : (
            <form onSubmit={handleOnSubmit} className="mt-6 flex w-full flex-col gap-y-4">
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
                  style={{ boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)" }}
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
                  style={{ boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)" }}
                  className="w-full rounded-[0.5rem] bg-gray-800 p-[12px] pr-12"
                />
                <span
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                  {showPassword
                    ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    : <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  }
                </span>
              </label>
              <button
                type="submit"
                className="mt-6 rounded-[8px] bg-[#EA00FF] py-[8px] px-[12px] font-medium hover:text-[#EA00FF] hover:bg-gray-200 transition duration-300"
              >
                <b>Sign In</b>
              </button>
            </form>
            )}
            <div className="mt-4 text-center">
              <span className="text-gray-300">Don't have an account? </span>
              <Link to="/signup" className="text-[#EA00FF] hover:underline">Create Account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login_Page_K
