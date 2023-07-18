import useWindowDimensions from '@/hook/useWindowDimensions'
import { setCredentialRequest } from '@/utils/axiosInstance'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactNode, useEffect, useState } from 'react'

interface Props {
    children: ReactNode
}
export default function LayoutPrivate({ children }: Props) {
    const [showSubMenu, setShowSubMenu] = useState(false)
    const [showSideBar, setShowSidebar] = useState<boolean>(true)
    const { isMobile } = useWindowDimensions()
    const router = useRouter()
    const { data: session } = useSession()
    const logout = async () => {
        const response = await signOut({ redirect: false })
        router.push('/login')
    }

    useEffect(() => {
        if (session?.user.error === "RefreshAccessTokenError") {
            logout()
        }
    }, [session]);

    useEffect(() => {
        if (session?.user.access_token !== undefined) {
            setCredentialRequest({ token: session.user.access_token, refresh_token: session.user.refresh_token! })
        }
    }, [session])
    return (
        <div className='flex'>
            {/* sidebar */}
            {
                showSideBar && isMobile && <div className=' fixed inset-0 z-0' onClick={() => setShowSidebar(false)}></div>
            }
            <div className={`w-[240px] bg-slate-50 min-h-screen z-10 fixed top-0 left-0 bottom-0 lg:relative transition-all duration-1000 ease-in-out ${showSideBar ? ' ml-0' : ' -ml-[240px]'}`}>
                <div className=' h-16 flex items-center px-3 border-b border-slate-300'>
                    CondoLink
                </div>
                <ul className=' px-3 py-2 text-base flex flex-col gap-1 max-h-menu overflow-scroll shadow-lg h-full'>
                    <li className='menu-item'>About Us</li>
                    <li className='menu-item'><Link href='/company'>Company</Link></li>
                    <li className='menu-item'>Feedback</li>
                    <li className=' flex flex-col menu'>
                        <span className=' menu-item block' onClick={() => setShowSubMenu(!showSubMenu)}>Social</span>
                        <ul className={`ml-2 flex flex-col gap-1 sub-menu overflow-hidden transition-all duration-1000 ease-in-out delay-0 ${showSubMenu ? ' max-h-screen' : 'max-h-0'}`}>
                            <li className=' menu-item mt-1'>News Board</li>
                            <li className=' menu-item'>Gagage Sale</li>
                        </ul>
                    </li>
                    <li className=' menu-item'>Properti</li>
                    <li className=' menu-item'>Payment</li>
                    <li className=' menu-item'>Formulir</li>
                    <li className=' menu-item'>Notifikasi</li>
                </ul>
            </div>
            <div className='flex flex-col flex-grow min-h-screen'>
                <div className=' pr-5 bg-sky-600 h-16 shrink-0 flex items-center text-white px-3'>
                    <div className=' flex gap-2 items-center'>
                        <button className=' w-4 h-3 flex flex-col justify-between' onClick={() => setShowSidebar(!showSideBar)}>
                            <span className=' bg-white h-[2px] w-full'></span>
                            <span className=' bg-white h-[2px] w-full'></span>
                            <span className=' bg-white h-[2px] w-full'></span>
                        </button>
                        <p>Navbar</p>
                    </div>
                </div>
                <main className=' m-2 p-3 bg-slate-50 flex-grow'>
                    {
                        session?.user.access_token === undefined ?
                            'Loading...'
                            : children
                    }
                </main>
                <footer className='bg-slate-50 h-16 shrink-0 flex items-center px-2'>
                    Copyright © 2014-2021 Oxbridge. All rights reserved.
                </footer>
            </div>
        </div>
    )
}
