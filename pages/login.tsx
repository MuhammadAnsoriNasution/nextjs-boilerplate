import type { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { signIn } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import Swal from 'sweetalert2'
import { nextAuthOptions } from './api/auth/[...nextauth]'

export default function Login() {
    const [loading, setLoading] = useState(false)

    const [dataForm, setDataForm] = useState({
        email: '',
        password: ''
    })

    const router = useRouter()
    const handleLogin = async () => {
        setLoading(true)
        const response = await signIn('credentials', { redirect: false, email: dataForm.email, password: dataForm.password })
        if (response?.ok) {
            setLoading(false)
            router.push('/')
        } else {
            setLoading(false)
            var message = "Unauthorized"
            Swal.fire({
                icon: 'error',
                text: message,
                timer: 3000
            })
        }
    }
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        handleLogin()
    }
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <div className=' w-full min-h-screen flex justify-center items-center p-5 bg-slate-50'>
                <div className=' bg-slate-200 w-80 h-80 rounded-md p-2'>
                    <form className=' flex gap-2 flex-col justify-center h-full' autoComplete="off" onSubmit={handleSubmit}>
                        <input value={dataForm.email} onChange={(e) => setDataForm(p => ({ ...p, email: e.target.value }))} required className=' outline-none py-2 rounded-md px-3' type="email" />
                        <input value={dataForm.password} onChange={(e) => setDataForm(p => ({ ...p, password: e.target.value }))} required className=' outline-none py-2 rounded-md px-3' type="password" />
                        <button disabled={loading} type='submit' className='  bg-sky-600 rounded-md py-2 mt-5 text-white'>{loading ? 'Loading...' : 'Login'}</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, nextAuthOptions)
    if (session?.user.access_token !== undefined) {
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    }
    return {
        props: {}
    }
}