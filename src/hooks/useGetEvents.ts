import { useState } from 'react';
import {
  getAllEvents,
  getEventJoinedUserByOwner,
  getOneEventInfo,
  getEventsListByCountry,
  getEventsListByCity,
} from '../api/eventAPI';
import { ClickMoreEventsButtonAttr, GetEventDefaultAttr, TimeOrder, UseGetEventsState } from './types';
import useResponseMessage from './useResponseMessage';

function useGetEvents(): UseGetEventsState {
  const { handleGetAPISuccess } = useResponseMessage();
  const [eventList, setEventList] = useState<UseGetEventsState['eventList']>(null);
  const [eventInfo, setEventInfo] = useState<UseGetEventsState['eventInfo']>(null);
  const [eventJoinedUserList, setEventJoinedUserList] = useState<UseGetEventsState['eventJoinedUserList']>(null);

  const handleClickMoreEventsButton = async (data: ClickMoreEventsButtonAttr) => {
    const { eventList, defaultAttr, country, city } = data;
    if (city) {
      const submitData = Object.assign(defaultAttr, { city: city });
      const res: any = await getEventsListByCity(submitData);
      const successRes = handleGetAPISuccess(res);
      if (successRes && eventList) setEventList(eventList.concat(res.data.data.events));
      return;
    } else if (country) {
      const submitData = Object.assign(defaultAttr, { country: country });
      const res: any = await getEventsListByCountry(submitData);
      const successRes = handleGetAPISuccess(res);
      if (successRes && eventList) setEventList(eventList.concat(res.data.data.events));
      return;
    } else {
      const res: any = await getAllEvents(defaultAttr);
      const successRes = handleGetAPISuccess(res);
      if (successRes && eventList) setEventList(eventList.concat(res.data.data.events));
    }
  };

  const handleGetAllEvents: UseGetEventsState['handleGetAllEvents'] = (data) => {
    getAllEvents(data).then((res: any) => {
      const successRes = handleGetAPISuccess(res);
      if (successRes) setEventList(res.data.data.events);
    });
  };

  const handleGetEventsListByCountry: UseGetEventsState['handleGetEventsListByCountry'] = (data) => {
    getEventsListByCountry(data).then((res: any) => {
      const successRes = handleGetAPISuccess(res);
      if (successRes) setEventList(res.data.data.events);
    });
  };

  const handleGetEventsListByCity: UseGetEventsState['handleGetEventsListByCity'] = (data) => {
    getEventsListByCity(data).then((res: any) => {
      const successRes = handleGetAPISuccess(res);
      if (successRes) setEventList(res.data.data.events);
    });
  };

  const handleGetOneEventInfo: UseGetEventsState['handleGetOneEventInfo'] = (eventId) => {
    getOneEventInfo(eventId).then((res: any) => {
      const successRes = handleGetAPISuccess(res);
      if (successRes) setEventInfo(res.data.data);
    });
  };

  const handleGetEventJoinedUserByOwner: UseGetEventsState['handleGetEventJoinedUserByOwner'] = (
    eventId: string,
    timeOrder?: TimeOrder.ASC | TimeOrder.DESC
  ) => {
    getEventJoinedUserByOwner(eventId, timeOrder).then((res: any) => {
      const successRes = handleGetAPISuccess(res);
      if (successRes) setEventJoinedUserList(res.data.data);
    });
  };

  return {
    eventList,
    handleGetAllEvents,
    handleGetEventsListByCountry,
    handleGetEventsListByCity,
    handleClickMoreEventsButton,

    eventInfo,
    handleGetOneEventInfo,

    eventJoinedUserList,
    handleGetEventJoinedUserByOwner,
  };
}

export default useGetEvents;
