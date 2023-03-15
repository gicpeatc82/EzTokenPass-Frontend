export const handleSetAddress = (userAddress: string) => {
  const frontText = userAddress.slice(0, 5);
  const endText = userAddress.slice(38, 42);
  const str = `${frontText}...${endText}`;
  return str;
};
