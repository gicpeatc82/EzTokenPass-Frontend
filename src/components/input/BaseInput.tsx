import { OutlinedInput } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

function BaseInput({
  name,
  value,
  handleChange,
  autocomplete,
  placeholder,
  helperText,
}: {
  name: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  autocomplete?: string;
  placeholder?: string;
}) {
  return (
    <FormControl fullWidth>
      <OutlinedInput
        id={`outlined-adornment-${name}`}
        value={value ? value : ''}
        onChange={handleChange}
        aria-describedby={`outlined-${name}-helper-text`}
        inputProps={{
          'aria-label': name,
        }}
        size="small"
        placeholder={placeholder ? placeholder : ''}
        autoComplete={autocomplete ? autocomplete : 'on'}
        sx={{ bgcolor: '#F0F0F0' }}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}

export default BaseInput;
