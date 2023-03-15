import TextareaAutosize from '@mui/base/TextareaAutosize';
import { FormControl, FormHelperText } from '@mui/material';

function BaseTextarea({
  name,
  value,
  handleChange,
  helperText,
  placeholder,
}: {
  name: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  helperText: string;
  placeholder?: string;
}) {
  return (
    <FormControl
      fullWidth
      sx={{
        color: '#333',
        '& textarea': {
          background: '#F0F0F0',
          width: '100%',
          borderRadius: '5px',
          border: '1px solid #b9b9b9',
          resize: 'none',
          minHeight: 200,
          maxHeight: 200,
          overflow: 'scroll !important',
          p: 1,
          fontFamily: '"Ubuntu", "Noto Sans TC"',
        },
        '& textarea:hover': {
          border: '1px solid #333',
        },
        '& textarea:focus-visible': {
          outline: 'none',
          border: '2px solid #01e2a6',
        },
      }}
    >
      <TextareaAutosize
        id={`outlined-adornment-${name}`}
        value={value ? value : ''}
        onChange={handleChange}
        aria-label="empty textarea"
        placeholder={placeholder ? placeholder : ''}
      />

      <FormHelperText>{value ? '' : helperText}</FormHelperText>
    </FormControl>
  );
}

export default BaseTextarea;
