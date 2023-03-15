import { getRequest, tokenRequestReturnErr, tokenRequest } from './baseAPI';
import { NetworkEvent, PhysicalEvent, SubmitEditEvent, TimeOrder } from '../hooks/types';
import { AxiosMethod, EventsListByCityAttr, EventsListByCountryAttr } from './types';

export const getAllEvents = async (data: { locale: string; offset: number; limit: number }) => {
  return await getRequest(`/events/${data.locale}?offset=${data.offset}&limit=${data.limit}`);
};

export const getOneEventInfo = async (eventId: string) => {
  return await getRequest(`/event/${eventId}`);
};

export const getEventsListByCountry = async (data: EventsListByCountryAttr) => {
  const { country, locale, offset, limit } = data;
  return await getRequest(`/events/country/${locale}/${country}?offset=${offset}&limit=${limit}`);
};

export const getEventsListByCity = async (data: EventsListByCityAttr) => {
  const { city, locale, offset, limit } = data;
  return await getRequest(`/events/city/${locale}/${city}?offset=${offset}&limit=${limit}`);
};

export const getQRcodeUrlByEventId = async (eventId: string) => {
  return await tokenRequest(AxiosMethod.get, `/event/url/${eventId}`);
};

export const getEventJoinedUserByOwner = async (eventId: string, timeOrder?: TimeOrder.ASC | TimeOrder.DESC) => {
  return await tokenRequest(AxiosMethod.get, `/check/${eventId}?timeOrder=${timeOrder || TimeOrder.DESC}`);
};

export const addNetworkEvent = async (data: NetworkEvent) => {
  return await tokenRequestReturnErr(AxiosMethod.post, `/event/network`, data);
};

export const addPhysicalEvent = async (data: PhysicalEvent) => {
  return await tokenRequestReturnErr(AxiosMethod.post, `/event/physical`, data);
};

export const updateEvent = async (eventId: string, data: SubmitEditEvent) => {
  return await tokenRequestReturnErr(AxiosMethod.put, `/event/${eventId}`, data);
};
