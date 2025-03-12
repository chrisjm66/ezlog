import { Icon } from "@iconify/react/dist/iconify.js";
import { ReactElement, useRef, useEffect } from "react";

const Modal = ({children, open, title, onClose}: ModalComponent): ReactElement => {
    const ref = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const modal = ref.current
        if (!modal) return

        if (open) {
            modal.showModal()
        } else {
            modal.close()
        }
    })

    const handleClick = () => {
        if (onClose) {
            onClose()
        } else {
            ref.current.close()
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        if (event.key === 'Escape') {
            handleClick()
        }
    }

    return (
        <dialog ref={ref} className='p-2 min-w-50 border-ezblue border-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' onKeyDown={handleKeyDown}>
            <div className='w-full flex relative h-8 align-middle p-1 mb-2'>
                <h1 className='font-bold text-2xl h-full text-right mr-20'>{title}</h1>


                {onClose ? <button className='h-full absolute right-2 top-2' onClick={handleClick}>
                    <Icon icon='mdi:close' className="w-full h-full"/>
                </button> : ''}
            </div>
            
            <div className='p-2'>
                {children}  
            </div>
            
        </dialog>
    )
}

interface ModalComponent {
    title: string
    open: boolean
    children: React.ReactNode
    onClose?: () => void
  };

export default Modal