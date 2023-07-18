
import { loginService, refreshTokenService } from "@/service/auth";
import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const nextAuthOptions: NextAuthOptions = {
    providers: [
        Credentials({
            id: "credentials",
            name: 'credentials',
            type: "credentials",
            credentials: {
                email: { label: "email", type: "email", required: true },
                password: { label: "password", type: "text", required: true },
            },
            async authorize(credentials, req) {
                try {
                    const response = await loginService({
                        email: credentials!.email,
                        password: credentials!.password,
                    })
                    if (response.status === 200) {
                        var expires_in = new Date();
                        // const time = Math.floor(response.data.expires_in / 60)
                        expires_in.setMinutes(expires_in.getMinutes() + parseInt(response.data.expires_in));
                        // expires_in.setSeconds(expires_in.getSeconds() + 30)
                        return {
                            ...response.data,
                            access_token: response.data.access_token,
                            refresh_token: response.data.refresh_token,
                            expires: expires_in.getTime(),
                        }
                    }
                    return null
                } catch (error: any) {
                    throw new Error(JSON.stringify({
                        statusCode: error.response.status,
                        data: error.response.data
                    }))
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            var sekarang = new Date();
            var waktuTambah10Menit = new Date(sekarang.getTime() + (10 * 60000));

            if (user) {
                token.access_token = user.access_token
                token.refresh_token = user.refresh_token
                token.expires = user.expires
                return token
            } else if (waktuTambah10Menit.getTime() < token.expires) {
                return token
            } else {
                try {
                    const response = await refreshTokenService({ refresh_token: token.refresh_token! })
                    if (response.status >= 200 && response.status < 300) {
                        var expires_in = new Date();
                        // const time = Math.floor(response.data.expires_in / 60)
                        expires_in.setMinutes(expires_in.getMinutes() + response.data.expires_in);
                        // expires_in.setSeconds(expires_in.getSeconds() + 30)
                        return {
                            ...response.data,
                            access_token: response.data.access_token,
                            refresh_token: response.data.refresh_token,
                            expires: expires_in.getTime(),
                        }
                    }
                    return { ...token, error: "RefreshAccessTokenError" as const }
                } catch (error: any) {
                    // console.log(error.response, "error response")
                    return { ...token, error: "RefreshAccessTokenError" as const }
                }
            }
        },
        async session({ session, token, user }) {
            session.user = token
            return session
        }
    }
}
export default NextAuth(nextAuthOptions)