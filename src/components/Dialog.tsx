import { useRef, useEffect } from 'react';

interface TimerProps {
    children: React.ReactNode;
    onClose: () => void;
    isOpen: boolean;
}
  
function Dialog({ children, onClose, isOpen }:TimerProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current) {
      if (isOpen) {
        dialogRef.current.showModal(); // Opens the dialog as a modal
      } else {
        dialogRef.current.close();
      }
    }
  }, [isOpen]);

  // Handle escape key closing the dialog and syncing state
  const handleCancel = (event: React.SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault(); // Prevent default dialog behavior of closing on escape
    onClose();
  };


    return (
    <dialog onCancel={handleCancel} className='m-auto p-0 backdrop:bg-opacity-50 open:animate-fade-inmt-8 rounded-xl bg-white dark:bg-gray-800 p-6 shadow-3xl backdrop:bg-black/50 backdrop:backdrop-blur-md' ref={dialogRef}>
      <button className='cursor-pointer' onClick={onClose} aria-label='close'>X</button>
      {children}
      
    </dialog>
    );
}

export default Dialog