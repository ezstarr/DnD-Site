// This file allows us to control permissions for every page in one place
// Only admin can create a new user
import {withAuth} from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  /* This is the middleware function that gets executed on each request. 
  The req parameter represents the HTTP request.*/ 
  function middleware(req) {
    console.log(req.nextUrl.pathname); // pathname of requested URL
    console.log(req.nextauth.token.role); // role contained in auth token

    if (
      req.nextUrl.pathname.startsWith("/CreateUser") && 
      req.nextauth.token.role != "admin"
    ) {
      return NextResponse.rewrite(new URL("/Denied", req.url))
      }
  }, 
  // Second argument to withAuth - contains configurations
  {
    callbacks: { // Defines a callback for authorization
      authorized: ({token}) => !!token // !! converts tokens presence to boolean
    }
  }
)
// Below is an array of the pages we want to protect
// 'matcher' array specifies paths the middleware should apply to
export const config = {matcher: ["/CreateUser"]}