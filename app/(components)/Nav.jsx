import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Nav = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header>

      <nav>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <Link href="/">Home</Link>
          <Link href="/CreateUser">Create User</Link>
          <Link href="/ClientMember">Client Member</Link>
          <Link href="/Member">Member</Link>
          <Link href="/Public">Public</Link>
          
          {session ? (
            <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
          ) : (
            <Link href="http://localhost:3000/api/auth/signin/discord">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
