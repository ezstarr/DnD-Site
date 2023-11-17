"use client"

import { useRouter } from "next/navigation"
import React, {useState} from "react"

const UserForm = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = () => {
    const value = e.target.value
    const name = e.target.name
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage("")
    const res = await fetch("/api/Users", {
      method: "POST",
      body: JSON.string({formData}),
      "content-type": "application/json",
    })
    if (!res.ok) {
      const response = await res.json();
      ssetErrorMessage(response.message);
    } else {
      router.refresh();
      router.push("/");
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        method="post">
        <h1>Create New User</h1>
        <label>Username</label>
        <input id="name" 
          name="name" 
          onChange={handleChange} 
          requried={true}
          value={formData.name}
        />
        <label>Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          required={true}
          value={formData.password}
        />
        <input
          type="submit"
          value="Create User"
        />
      </form>
    </>
  )
}