import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { asyncCurrentAdmin, asyncSignupAdmin } from '../store/actions/adminAction';
import { useDispatch } from "react-redux"
import { login } from '../store/slice/adminSlice';
import Input from './Input';
import Button from './Button';



const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const { register, handleSubmit } = useForm()


  const create = async (Formdata) => {
    setError("")
    try {
      await dispatch(asyncSignupAdmin(Formdata));

      await dispatch(asyncCurrentAdmin())

      // dispatch(login(Formdata))

      navigate("/signin")

    } catch (error) {
      console.log("signup error :: ", error)
      setError(error.message)
    }
  }


  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        {/* Header Title */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-blue-600">Create Account</h1>
          <p className="text-gray-500 text-sm mt-1">Join the Two-Wheeler ERP system</p>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-center text-sm mb-4">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(create)} className="space-y-5">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            {...register("name", { required: true })}
          />
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Enter a valid email address",
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Create Account
          </Button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600 font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>


  )
}

export default Signup;