import React, { useState } from 'react'
import { asyncCreateCompanys, asyncGetCompanys } from '../store/actions/cmpanyAction.js'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import Input from '../components/Input'
import Button from '../components/Button.jsx'

const CompanyMaster = () => {
    const dispatch = useDispatch();
    const { Companies, Loading, Error } = useSelector((state) => state.company);
    console.log("compinesMaster company", Companies)
    const { register, handleSubmit } = useForm()

    const submit = async (data) => {
        try {
            dispatch(asyncCreateCompanys(data))
        } catch (error) {
            dispatch(Error(error))
            console.log("companyMaster components error::", error)
        }
    }


    return (
        <div className='p-6 max-w-3xl mx-auto'>
            <h2 className='text-2xl font-bold mb-4'>Company Master</h2>

            <form onSubmit={handleSubmit(submit)} className='flex gap-2 mb-4'>
                <Input
                    label="Company Name: "
                    placeholder='Enter company name'
                    required
                    {...register("name")}
                />
                <Button type="submit">Add</Button>
            </form>

            {Loading && <p>Loading...</p>}
            {Error && <p className='text-red-600'>{error}</p>}

            <ul className='space-y-2'>
                {Companies?.map((comp) => (
                    <li key={comp._id} className='flex justify-between bg-white p-2 shadow rounded'>
                        <span>{comp.name}</span>
                        {/* <button onClick={() => handleDelete(comp._id)} className='text-red-600'>Delete</button> */}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CompanyMaster