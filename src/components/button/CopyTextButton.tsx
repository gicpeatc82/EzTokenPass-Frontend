import React, { useState } from 'react';
import { Alert, Snackbar, Button } from '@mui/material';
import ClipboardJS from 'clipboard';

interface CopyProps {
  copyText: string;
  successCopyMessage: string;
  buttonText?: string;
}

export default function CopyTextButton({ copyText, successCopyMessage, buttonText }: CopyProps) {
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const handleCopyClick = () => {
    const clipboard = new ClipboardJS('#copyText');
    setCopySuccess(true);
  };
  const handleCloseCopyMessage = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setCopySuccess(false);
  };
  return (
    <>
      <Button
        variant="contained"
        size="small"
        sx={{ pl: { xs: 2, md: 4 }, pr: { xs: 2, md: 4 }, boxShadow: 'none', whiteSpace: 'nowrap' }}
        onClick={handleCopyClick}
        id="copyText"
        data-clipboard-text={copyText}
      >
        {buttonText ? buttonText : 'COPY'}
      </Button>

      <Snackbar open={copySuccess} autoHideDuration={6000} onClose={handleCloseCopyMessage}>
        <Alert
          onClose={handleCloseCopyMessage}
          severity="success"
          sx={{
            width: '100%',
            fontSize: '1rem',
            background: '#01e2a6',
            color: '#ffffff',
          }}
        >
          {successCopyMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
