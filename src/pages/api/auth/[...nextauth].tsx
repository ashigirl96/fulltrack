import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { required } from '@/lib/envs'

const GOOGLE_CLIENT_ID = required(process.env.GOOGLE_CLIENT_ID)
const GOOGLE_CLIENT_SECRET = required(process.env.GOOGLE_CLIENT_SECRET)

console.error(`GOOGLE_CLIENT_ID ${JSON.stringify(GOOGLE_CLIENT_ID)}`)
console.error(`GOOGLE_CLIENT_SECRET ${JSON.stringify(GOOGLE_CLIENT_SECRET)}`)

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {},
})
