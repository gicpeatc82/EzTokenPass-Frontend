import { useState } from 'react';
import { UseOpenState } from './types';

function useOpen(): UseOpenState {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return { open, handleClickOpen, handleClose };
}

export default useOpen;
