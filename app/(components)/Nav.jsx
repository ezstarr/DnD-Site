import React from "react";
// import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Nav = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header>
      <nav>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          {/* <Link href="/"><a>Home</a></Link>
          <Link href="/CreateUser"><a>Create User</a></Link>
          <Link href="/ClientMember"><a>Client Member</a></Link>
          <Link href="/Member"><a>Member</a></Link>
          <Link href="/Public"><a>Public</a></Link> */}
          <a href="/">home</a>
          <a href="/CreateUser">CreateUser</a>
          <a href="/ClientMember">ClientMember</a>
          <a href="/Public">Public</a>
          
          {session ? (
            <a href="/api/auth/signout?callbackUrl=/">Logout</a>
          ) : (
            <a href="http://localhost:3000/api/auth/signin/discord">
              Login
            </a>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
