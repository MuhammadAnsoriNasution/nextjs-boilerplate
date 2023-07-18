import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req, res) {
        // if (req.nextauth.token?.access_token !== undefined && req.nextUrl.pathname !== '/login') {
        //     return NextResponse.next()
        // } else {
        //     if (req.nextUrl.pathname === '/login' && req.nextauth.token?.access_token === undefined) {
        //         return NextResponse.next()
        //     } else {
        //         return NextResponse.redirect(new URL('/', req.url))
        //     }
        // }
        return NextResponse.next()
    },
    {
        pages: {
            signIn: '/login'
        }
    }
)


export const config = {
    matcher: [
        '', '/dashboard'
    ],
}