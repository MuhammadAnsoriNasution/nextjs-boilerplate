import React, { ReactNode } from 'react'
import { Dialog as DialogHeadless } from '@headlessui/react'

interface Props {
    isOpen: boolean,
    handleClose: () => void,
    children: ReactNode,
    title: string
}
export default function Dialog({ isOpen, handleClose, children, title }: Props) {
    return (
        <DialogHeadless
            open={isOpen}
            onClose={handleClose}
            className="relative z-50"
        >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogHeadless.Panel className="mx-auto max-w-sm lg:max-w-4xl lg:w-[790px] rounded bg-white p-5">
                        <div className=' flex justify-center items-center mb-5'>
                            <DialogHeadless.Title>{title}</DialogHeadless.Title>
                        </div>
                        {children}
                    </DialogHeadless.Panel>
                </div>
            </div>
        </DialogHeadless>
    )
}
