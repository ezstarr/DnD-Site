import DiscordProvider from "next-auth/providers/discord"
import { signIn, signOut, useSession } from 'next-auth/react'

export const options = {
    providers: [
        DiscordProvider({
            profile(profile) {
                if (profile?.email) {
                  delete profile.email
                }
                console.log("Profile Discord: ", profile)
                let userRole = "Discord User"
                let userName = "Discord Username"
                
                if (profile?.username == "timeenjoyed") { userRole = "admin" }
                console.log(profile.username)
                if (profile.username) { userName = profile.username }

                return {
                    ...profile,
                    role: userRole,
                    user: userName,
                }
            },
            clientId: process.env.DISCORD_ID,
            clientSecret: process.env.DISCORD_SECRET,
            authorization: { params: { scope: 'identify' } }
        })],
    callbacks: {
        // utilize token on the server side
        async jwt({ token, user }) {
          if (user) token.role = user.role 
          if (user) token.name = user.user
          return token
        },
        // utilize token on the client side
        
        async session({ session, token, user }) {
            if (session?.user) {
              delete session.user.email;
            }
            if (session?.user) session.user.role = token.role
            return session
        }
    }
}