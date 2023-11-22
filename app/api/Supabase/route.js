import {getServerSession} from "next-auth/next"
import {createClient} from "@supabase/supabase-js"
import {authOptions} from "../auth/[...nextauth]/route"
import {NextResponse} from "next/server"
import {getToken} from "next-auth/jwt"

export async function GET(request) {

  // TODO: protect this endpoint later so only this website can access it.

  const supabase = createClient(  
    process.env.SUPABASE_URL, 
    process.env.ANON_KEY)

  const { data, error, status} = await supabase
    .from('players')
    .select('username')

  // Check for supabase query errors
  if (error) {
    console.log('Error fetching data', error);
    return NextResponse(null, {status: status || 500 })
  }
  return NextResponse.json(data)
}

export async function POST(req) {
  // const session = await getServerSession(authOptions)

  // if (!session) {
  //   return NextResponse.json({error: 'Unauthorized'}, { status: 403 })
  // } 
  const token = await getToken({req})
  console.log(token.id)
  
  const userObj = await req.json()
  const username = userObj.name
  const password = userObj.password

  const supabase = createClient(  
  process.env.SUPABASE_URL, 
  process.env.ANON_KEY)

  const { data, error, status } = await supabase
    .from('players')
    .insert([{ username: username, password: password}])
    .select()

  if (error) {
    console.log('Error fetching data', error);
    return NextResponse(null, {status: status || 500 })
  }
  console.log('Successfully added new user.')
  return Response.json({"message": "Successfully added new user."})}