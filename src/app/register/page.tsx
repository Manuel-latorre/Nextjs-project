'use client'

import axios, {AxiosError} from "axios";
import { Input } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation";




export default function RegisterPage() {

    const [error, setError ] = useState()
    const router = useRouter()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);


        try {
            const signUpResponse =  await axios.post('/api/auth/signup', {
                email: formData.get('email'),
                fullname: formData.get('fullname'),
                password: formData.get('password'),
            },
            );
            console.log(signUpResponse, 'signUpResponseee');

            const res = await signIn('credentials', {
              email: signUpResponse.data.email,
              password: formData.get('password'),
              redirect: false,
            },
            )

            if(res?.ok) return router.push('/dashboard')
            console.log(res);
            
        } catch (error) {
            console.log(error);
            if(error instanceof AxiosError){
                setError(error.response?.data.message)
            }
            
        }
    }


  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-xs">

        { error && <div className="bg-red-500 text-white p-2 mb-2"> {error} </div> }

        <h1 className="text-2xl mb-2 text-center">Sign Up</h1>

        <Input isRequired type="text" label="Fullname" placeholder="Fullname" name="fullname" className="mb-2" />
        <Input isRequired type="email" label="Email" placeholder="Email" name="email" className="mb-2" />
        <Input isRequired type="password" label="Password" placeholder="*****" name="password" className="mb-2" />

        <button>Register</button>
      </form>
    </div>
  );
}
