import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Input from "../components/Input"
import Button from "../components/Button"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../store/slice/adminSlice';
import { asyncCurrentAdmin, asyncSigninAdmin } from '../store/actions/adminAction';


const Signin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [error, setError] = useState()
  const { register, handleSubmit } = useForm()

  const login = async (Admindata) => {
    setError("")
    try {
      await dispatch(asyncSigninAdmin(Admindata))
      await dispatch(asyncCurrentAdmin())
      // dispatch(login(userData))
      navigate("/")

    } catch (error) {
      console.log("signin error :: ", error)
      setError(error.message)
    }

  }



  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">

        {/* Logo / Title */}
        <div className="mb-6 text-center">
          {/* <Logo /> */}
          <h1 className="text-3xl font-extrabold text-blue-600">TwoWheeler ERP</h1>
          <p className="text-gray-500 mt-1 text-sm">Sign in to your admin account</p>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-center text-sm mb-4">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="space-y-5">
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be valid",
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
            })}
          />

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Sign In
          </Button>
        </form>

        {/* Signup link */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>

  )
}

export default Signin;