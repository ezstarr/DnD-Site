import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
// import { useSession, signIn, signOut } from "next-auth"

const Nav = async () => {
  // const { data: session } = useSession();

  // if (session) {
  //   return (
  //     <>
  //       Signed in as {session.username}<br/>
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   )
  // }
  // return (
  //   <>
  //     Not signed in<br/>
  //     <button onClick={() => signIn()}>Sign in</button>
  //   </>
  // )
  const session = await getServerSession(options);
  return (
    <header>
      <nav className="nav">
        <div>
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
