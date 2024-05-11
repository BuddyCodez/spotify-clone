"use client";
import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';

interface ModalProps {
    isOpen: boolean;
    onChange: (open: boolean) => void;
    title: string;
    description: string;
    children: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({isOpen, onChange, title,description,children}) => {
  return (
   <Dialog open={isOpen} defaultOpen={isOpen} onOpenChange={onChange} > 
   <div className="portal">
      <DialogContent className="backdrop-blur-sm bg-neutral-900/90 fixed drop-shadow-md border border-neutral-700 top-[50%] right-[50%] max-h-[70vh] h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-neutral-800 p-[25px] text-white">
        <DialogHeader>
          <DialogTitle className='text-xl text-center font-bold mb-4'>{title}</DialogTitle>
          <DialogDescription className='mb-5 text-sm leading-normal text-center'>
           {description}
          </DialogDescription>
        </DialogHeader>
        <div>{children}</div>
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </div>
   </Dialog>
  )
}

export default Modal