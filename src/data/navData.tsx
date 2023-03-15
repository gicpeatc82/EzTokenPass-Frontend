import { ChainName } from '../hooks/types';

export const langData = [
  { name: 'English', language: 'lang_en', locale: 'en' },
  { name: '華語', language: 'lang_zh', locale: 'zh' },
  { name: '日本語', language: 'lang_jp', locale: 'jp' },
];

export const userMenuData = [
  { name: 'My Wallet List', link: '/member/my_wallet', img: '/image/user_icon/setting.png' },
  { name: 'My Info', link: '/member/my_info', img: '/image/user_icon/myInfo.png' },
  { name: 'My NFT', link: '/member/my_nft', img: '/image/user_icon/NFT.png' },
  { name: 'Organization', link: '/member/my_organization', img: '/image/user_icon/organization.png' },
  { name: 'Manage Events', link: '/member/my_manage_events', img: '/image/user_icon/event.png' },
];

export const chainCoinMenuData = [
  { name: `${ChainName['Ethereum']}`, img: '/image/coin/ETH.png' },
  { name: `${ChainName['BSC']}`, img: '/image/coin/BSC.png' },
  { name: `${ChainName['ARA']}`, img: '/image/coin/ARA.png' },
  { name: `${ChainName['Polygon']}`, img: '/image/coin/Polygon.png' },
  { name: `${ChainName['TON']}`, img: '/image/coin/TON.png' },
];
