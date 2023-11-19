"use client"

import { useRouter } from "next/navigation"
import React, {useState} from "react"

const UserForm = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    setErrorMessage("")
    const res = await fetch("/api/Supabase", {
      method: "POST",
      body: JSON.stringify(formData),
      "content-type": "application/json",
    })
    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      router.refresh();
      router.push("/");
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        method="post"
      >
        <h1>Create New User</h1>
        <label>Username</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={handleChange}
          required={true}
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
      <p>{errorMessage}</p>
    </>
  )
}
export default UserForm;