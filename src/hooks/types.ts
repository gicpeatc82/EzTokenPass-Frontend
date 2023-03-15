import { addBindUserNewAddressAttr, EventsListByCityAttr, EventsListByCountryAttr, LocaleState } from '../api/types';

declare global {
  interface Window {
    ton: any;
    tonClient: any;
  }
}

export interface UseAlertBoxState {
  handleShowLoadingBox: (isShow: boolean) => void;
  handleShowAlertBox: (text: string, bgColor?: string) => void;
}
export interface UseStepState {
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  handleInitStep: () => void;
}

export interface UseOpenState {
  open: boolean;
  handleClickOpen: () => void;
  handleClose: () => void;
}

export enum ChainName {
  Ethereum = 'Ethereum',
  BSC = 'BSC',
  Polygon = 'Polygon',
  ARA = 'ARA',
  TON = 'Ton',
}

export interface ChainNameState {
  chain: ChainName.Ethereum | ChainName.BSC | ChainName.Polygon | ChainName.ARA | ChainName.TON;
}

export enum ChainId {
  is721 = 'ERC721',
  is1155 = 'ERC1155',
  isTon = 'TON',
}

export enum TabValueText {
  network = 'network',
  physical = 'physical',
  single = 'single',
  recurring = 'recurring',
}

export interface TabValue {
  eventPlace: TabValueText.network | TabValueText.physical;
  eventDuring: TabValueText.single | TabValueText.recurring;
}

export interface UseCreateEventTabState {
  tabEventPlace: number;
  handleChangeEventPlace: (event: React.SyntheticEvent, newValue: number) => void;

  tabEventDuring: number;
  handleChangeEventDuring: (event: React.SyntheticEvent, newValue: number) => void;

  tabValue: TabValue;
}

export interface Question1State {
  hostFrequency: string;
  deployedContract: 'true' | 'false';
  howToKnow: string;
}

export interface UseQuestionsState {
  questions1: Question1State;
  handleChangeQuestions1: (prop: keyof Question1State) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddUserSurveyResults: (data: Question1State) => void;
}

export interface CreateEventState {
  howPeople: string;
  contractType: ChainId;
  address: string;
  gmt: string;
  eventName: string;
  chain: ChainNameState['chain'];
  tokenAddress: string;
  usageCount: number; //default: 0
  description: string; //default: null
  country: string;
  city: string; //default: null
}

export interface UseEventState {
  eventValues: CreateEventState;
  handleChangeEventValues: (
    prop: keyof CreateEventState
  ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  showImg: { imageFile: File | null; showURL: string };
  handleChangeImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddNetworkEvent: (data: NetworkEvent) => Promise<boolean>;
  handleAddPhysicalEvent: (data: PhysicalEvent) => Promise<boolean>;
  successEventData: { eventId: string; qrcodeUrl: string; testQrcodeUrl: string } | null;
  handleUpdateEvent: (eventId: string, data: EditEvent) => void;
}

export interface UseCheckAndAddEventState {
  handleCheckValues: (
    activeStep: number,
    question: UseQuestionsState,
    createEvent: UseEventState,
    createDateTime: UseDateTimeState,
    page3Tab: UseCreateEventTabState,
    handleNext: UseStepState['handleNext']
  ) => void;
}

export interface TimeState {
  startDate: Date;
  startTime: Date;
  endDate: Date | null;
  endTime: Date | null;
}

export interface UseDateTimeState {
  timeValues: TimeState;
  handleChangeTimeValues: (prop: keyof TimeState) => (date: Date) => void;
  handleClearEndDateAndTime: () => void;
}

export enum TimeOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface HomeEvent {
  bannerURL: string | null;
  chain: string;
  cityKey: string;
  cityName: string;
  countryKey: string;
  countryName: string;
  description: string;
  endTime: number;
  eventId: string;
  eventName: string;
  organization: string | null;
  owner: string;
  ownerName: string;
  startTime: number;
  tokenAddress: string;
  tokenType: string;
  usageCount: number;
}

export interface OneEventInfo {
  bannerURL: string | null;
  chain: string;
  city: string;
  country: string;
  description: string;
  endTime: number;
  eventId: string;
  eventName: string;
  isNetworkEvent: boolean;
  organization: string | null;
  ownerId: string;
  ownerName: string;
  ownerPhotoURL: string;
  physicalAddress: string;
  startTime: number;
  timeZone: string;
  tokenAddress: string;
  tokenType: string;
  usageCount: number;
}
export interface UserEventInfo {
  bannerURL: string;
  chain: string;
  city: string | null;
  description: string;
  endTime: number;
  eventId: string;
  eventName: string;
  isNetworkEvent: boolean;
  organization: string | null;
  owner: string;
  physicalAddress: string;
  startTime: string;
  tokenAddress: string;
  tokenType: string;
  usageCount: number;
  timeZone: string;
}

export interface UserJoinedEventHistory {
  bannerURL: string | null;
  eventId: string;
  eventName: string;
  location: string | null;
  nftTokenId: string | null;
  ownerAddress: string;
  time: string;
  tokenAddress: string | null;
  userName: string;
}
export interface UserJoinedEvent {
  bannerURL: string;
  eventId: string;
  eventName: string;
  history: UserJoinedEventHistory[];
}

export interface UserEventNFTsAmount {
  tokenAddress: string;
  userAddress: string;
  balance: number;
}
export interface UseUserState {
  userBoundAddress: { address: string; addressType: string; walletType: string }[] | null;
  handleGetUserBoundAddress: () => void;
  userJoinedEvents: UserJoinedEvent[] | null;
  handleGetUserJoinedEvents: (timeOrder?: TimeOrder.ASC | TimeOrder.DESC) => void;
  userCreateEvents: UserEventInfo[] | null;
  handleGetUserCreateEvents: () => void;
  userEventNFTsAmount: UserEventNFTsAmount[] | null;
  handleGetUserEventNFTsAmount: (eventId: string) => void;
  handleDeleteUserBoundAddress: (address: string) => void;
  handleRemoveUserEvent: (eventId: string) => void;
  handleUpdateUserName: (userName: string) => void;
  handleUpdateUserAvatar: (showImg: UseEventState['showImg']) => void;
}
export interface UseVerifyQrCodeState {
  userSpecificEventTokenList: [] | null;
  userSpecificEventTokenListTotalPage: number;
  handleGetSpecificEventNFTsByUserWallet: (eventId: string, offset: number, limit: number) => void;
  joinEventSuccessData: { eventId: string; eventName: string; tokenId: string } | null;
  handleCheckBoundAddress: (eventId: string, data: { address: string; tokenId: string; hash: string }) => void;
}

export interface EventJoinedUser {
  bannerURL: string;
  eventId: string;
  eventName: string;
  location: string;
  nftTokenId: number;
  ownerAddress: string;
  time: string;
  tokenAddress: string;
  userId: string;
  userName: string;
  userPhotoURL: string | null;
}

export interface GetEventDefaultAttr {
  locale: string;
  offset: number;
  limit: number;
}

export interface ClickMoreEventsButtonAttr {
  eventList: UseGetEventsState['eventList'];
  defaultAttr: GetEventDefaultAttr;
  country?: string;
  city?: string;
}
export interface UseGetEventsState {
  eventList: HomeEvent[] | null;
  handleGetAllEvents: (data: GetEventDefaultAttr) => void;
  eventInfo: OneEventInfo | null;
  handleGetOneEventInfo: (eventId: string) => void;
  eventJoinedUserList: EventJoinedUser[] | null;
  handleGetEventJoinedUserByOwner: (eventId: string, timeOrder?: TimeOrder.ASC | TimeOrder.DESC) => void;
  handleGetEventsListByCountry: (data: EventsListByCountryAttr) => void;
  handleGetEventsListByCity: (data: EventsListByCityAttr) => void;
  handleClickMoreEventsButton: (data: ClickMoreEventsButtonAttr) => void;
}

export interface NetworkEvent {
  eventName: string;
  chain: ChainNameState['chain'];
  tokenAddress: string;
  usageCount: number; // 0: 無限 1: 一次
  membersNumber?: number;
  description?: string;
  startTime?: number;
  endTime?: number | string;
  bannerURL?: string;
  timeZone?: string;
}

export interface PhysicalEvent {
  eventName: string;
  chain: ChainNameState['chain'];
  tokenAddress: string;
  usageCount: number; // 0: 無限 1: 一次
  membersNumber?: number;
  description?: string;
  startTime?: number;
  endTime?: number | string;
  bannerURL?: string;
  city: string;
  physicalAddress?: string;
}

export interface EditEvent {
  city: string;
  physicalAddress: string;
  startDate: Date;
  startTime: Date;
  isNetworkEvent: boolean;
  endDate?: Date | null;
  endTime?: Date | null;
  description?: string;
  timeZone?: string;
}

export interface SubmitEditEvent {
  city: string;
  physicalAddress: string;
  startTime: number;
  endTime?: number | null;
  description?: string;
}

export interface UseGetLocationState {
  allCountriesList: [] | null;
  handleGetAllCountriesList: (locale: LocaleState['locale']) => void;

  allCitiesList: [] | null;
  handleGetAllCitiesByCountry: (country: string, locale: LocaleState['locale']) => void;

  timeZoomList: [] | null;
  handleGetTimeZoom: (locale: LocaleState['locale']) => void;
}

export interface UseUserGetNFTsState {
  userNFTsList: any[] | null;
  handleGetUserChainNFTs: (chain: ChainNameState['chain']) => void;
}

export interface UseSignatureState {
  bindUserNewAddress: (data: addBindUserNewAddressAttr) => void;
}
