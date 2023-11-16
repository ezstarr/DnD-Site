// Explicitly say this page will be rendered on the client side
// Client does not support async 
"use client";

import {useSession} from "next-auth/react"
import {redirect} from "next/navigation"

const Member = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated(){
      redirect("/api/auth/signin?callbackUrl=/ClientMember")
    },
  })
  return (
    <div>
      <h1>Member Client Session</h1>
      <p>{session?.user?.name}</p>
      <p>{session?.user?.role}</p>
    </div>
  )
}

export default Member
