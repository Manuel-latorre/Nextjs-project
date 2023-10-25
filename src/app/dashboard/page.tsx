'use client'


import { useSession, signOut } from 'next-auth/react'

export default function DashboardPage(){

    const {data: session, status} = useSession()
    console.log(session, status);
    

    return(
        <div>
            <h1>dashboard</h1>
            <button onClick={() => signOut()}>Logout</button>
        </div>
    )
}