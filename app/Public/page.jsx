import React from 'react'

const Public = () => {
  return (
    <div>
      <h1>Public</h1>
      <ul>
        <li>Add admin functionality to add random test users - "Create User"</li>
        <li>Admin fills out form (client side)</li>
        <li>Form sends data to an api backend</li>
        <li><s>backend inserts data into supabase</s></li>
        <li>So in your database, make a tokens table, when a user logs in they get a token, have an admin column, set it to true for anyone who is admin, store the token in secure cookies, send the cookies as auth headers to your API, make a call the database in the endpoint and validate its an admin token - mysty

        </li>
      </ul>
    </div>
  )
}

export default Public
