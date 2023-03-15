import React from 'react';

export interface useSelectChipState {
  selectedValue: string;
  setSelectedValue: (value: useSelectChipState['selectedValue']) => void;
  handleChangeSelectedValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function useSelectChip(): useSelectChipState {
  const [selectedValue, setSelectedValue] = React.useState<useSelectChipState['selectedValue']>('');

  const handleChangeSelectedValue: useSelectChipState['handleChangeSelectedValue'] = (event) => {
    setSelectedValue(event.target.value);
  };

  return {
    selectedValue,
    setSelectedValue,
    handleChangeSelectedValue,
  };
}

export default useSelectChip;
