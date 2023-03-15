import { ChainId, ChainName } from '../hooks/types';

export const howOftenList = [
  { name: 'Daily', value: '1' },
  { name: 'Weekly', value: '2' },
  { name: 'Monthly', value: '3' },
  { name: 'Annually', value: '4' },
];

export const howDoUKnowList = [
  { name: 'I am FreePort game player', value: '1' },
  { name: 'Saw it on social media', value: '2' },
  { name: 'Recommended from friend', value: '3' },
  { name: 'Searched on internet', value: '4' },
];

export const howManyPeopleList = [
  { name: 'Only me', value: '1' },
  { name: '2 ~ 5', value: '2' },
  { name: '6 ~ 10', value: '3' },
  { name: '11 ~30', value: '4' },
  { name: '31 ~ 100', value: '5' },
  { name: '100+', value: '6' },
];

export const chainTypeList = [
  { name: 'Ethereum', value: ChainName.Ethereum },
  { name: 'Binance Smart Chain', value: ChainName.BSC },
  { name: 'Polygon', value: ChainName.Polygon },
  { name: 'Arina Chain', value: ChainName.ARA },
  { name: 'TON', value: ChainName.TON },
];

export const smartContractTypeList = [
  { name: 'ERC721', value: ChainId.is721 },
  { name: 'ERC1155', value: ChainId.is1155 },
  { name: 'TON NFT collection', value: ChainId.isTon },
];

export const usageCountList = [
  { name: 'Once', value: '1' },
  { name: 'Unlimited number', value: '0' },
];
