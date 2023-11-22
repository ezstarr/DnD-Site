import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord"
import {createClient} from "@supabase/supabase-js"
import {getToken} from "next-auth/jwt"

async function insertNewUser(token, user) {
  if (user) {
    // Set the role from the token
    const role = token.role;
    const id = token.id;
    const username = token.name;
    // Insert the user into the database
    const supabase = createClient(  
      process.env.SUPABASE_URL, 
      process.env.ANON_KEY)
    const { data, error } = await supabase
      .from('players')
      .upsert([{ username: username, discordUid: id, role: role}])
      .select()

    if (error) {
      console.error('Error inserting user into the database:', error);
      return
    }
    console.log("Successfully added discord user to database")
    
  }

  return token;
}

export const authOptions = {
  providers: [
      DiscordProvider({
          profile(profile) {
              if (profile?.email) {
                delete profile.email
              }
              console.log("Profile Discord: ", profile)
              let userRole = "user"
              let userName = "Discord Username"
              let discordUid = 0
              
              if (profile?.username == "timeenjoyed") { userRole = "admin" }
              if (profile.username) { 
                userName = profile.username 
                discordUid = profile.id
              }
              return {
                ...profile,
                role: userRole,
                user: userName,
                id: discordUid
              }
          },
          clientId: process.env.DISCORD_ID,
          clientSecret: process.env.DISCORD_SECRET,
          authorization: { params: { scope: 'identify' } }
      })],
  callbacks: {
      // utilize token on the server side (JSON - header)
      async jwt({ token, user }) {
        if (user) {
          token.role = user.role 
          token.name = user.user 
          token.id = user.id
        }
        await insertNewUser(token, user);
        return token
      },
      
      // utilize token on the client side ()
      async session({ session, token, user }) {
          if (session?.user) {
            delete session.user.email;
          }
          if (session?.user) session.user.role = token.role
          return session
      }
  }
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST};