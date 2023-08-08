import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { json } from 'stream/consumers'

export const options: NextAuthOptions = {
    pages: {
        signIn: '/api/auth/login',
        //signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        //verifyRequest: '/auth/verify-request', // (used for check email message)        
    },
    providers: [
        // GitHubProvider({
        //     clientId: process.env.GITHUB_ID as string,
        //     clientSecret: process.env.GITHUB_SECRET as string,
        // }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "Kullanıcı adınız"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "Şifreniz"
                }
            },
            async authorize(credentials) {
                // This is where you need to retrieve user data 
                // to verify with credentials
                // Docs: https://next-auth.js.org/configuration/providers/credentials
                const validUsers = JSON.parse(process.env.AUTHENTICATION as string)           
                const user = validUsers.find((item: { NAME: string | undefined; PASSWORD: string | undefined }) =>
                    item.NAME === credentials?.username && item.PASSWORD === credentials?.password)

                if (user) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
}