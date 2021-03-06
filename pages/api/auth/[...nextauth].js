import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code'
        })
    ],
    jwt: {
        encryption: true
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ account, profile }) {
            if(account.provider === 'google' && profile.hd === 'pcrest.org' && profile.email_verified) {
                return true
            }
            return '/failed_sign_in'
        },
        async redirect({url, baseUrl}) {
            return baseUrl
        }
    },
})