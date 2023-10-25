'use client'

import { Input } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation";




export default function LoginPage() {

    const [error, setError ] = useState('')
    const router = useRouter()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const res = await signIn('credentials', {
          email: formData.get('email'),
          password: formData.get('password'),
          redirect: false,
        })

        if(res?.error) return setError(res.error as string)

        if(res?.ok) return router.push('/')
        
    }


  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-xs">

        { error && <div className="bg-red-500 text-white p-2 mb-2"> {error} </div> }

        <h1 className="text-2xl mb-2 text-center">Sign In</h1>

        <Input isRequired type="email" label="Email" placeholder="Email" name="email" className="mb-2" />
        <Input isRequired type="password" label="Password" placeholder="*****" name="password" className="mb-2" />

        <button>Login</button>
      </form>
    </div>
  );
}
