import { useState } from 'react';
import { addNetworkEvent, addPhysicalEvent, updateEvent } from '../api/eventAPI';
import { getDateTimeToTimeStamp } from '../utils/dateAddTime';
import { EditEvent, NetworkEvent, PhysicalEvent } from './types';
import { ChainName, ChainId, CreateEventState, UseEventState } from './types';
import useResponseMessage from './useResponseMessage';

interface useEventProps {
  city?: string | null;
  address?: string | null;
  timeZone?: string;
}

function useEvent(data?: useEventProps): UseEventState {
  const { handleGetAPISuccess, handleShowInfoMessage } = useResponseMessage();
  const [showImg, setShowImg] = useState<UseEventState['showImg']>({
    imageFile: null,
    showURL: '',
  });

  const [successEventData, setSuccessEventData] = useState(null);

  const [eventValues, setEventValues] = useState<CreateEventState>({
    howPeople: '',
    contractType: ChainId.is721,
    address: data?.address ? data.address : '',
    gmt: data?.timeZone ? data?.timeZone : 'Network(UTC+8)', // timeZone
    eventName: '',
    chain: ChainName.Ethereum,
    tokenAddress: '',
    usageCount: 0,
    description: '',
    country: 'Taiwan',
    city: data?.city && !data?.city.includes('Network') ? data.city : '',
  });

  const handleChangeEventValues =
    (prop: keyof CreateEventState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setEventValues({ ...eventValues, [prop]: event.target.value });
    };

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length !== 0) {
      const imageFile = event.target.files?.[0];
      const showImage = URL.createObjectURL(imageFile);
      setShowImg({
        imageFile: imageFile,
        showURL: showImage,
      });
    }
  };

  // 新增網路活動
  const handleAddNetworkEvent = async (data: NetworkEvent) => {
    const res: any = await addNetworkEvent(data);
    const successRes = handleShowInfoMessage(res);
    if (successRes) {
      // 新增線上活動成功
      setSuccessEventData(res.data.data);
      return true;
    }
    return false;
  };

  // 新增實體活動
  const handleAddPhysicalEvent = async (data: PhysicalEvent) => {
    const res: any = await addPhysicalEvent(data);
    const successRes = handleShowInfoMessage(res);
    if (successRes) {
      // 新增實體活動成功
      setSuccessEventData(res.data.data);
      return true;
    }
    return false;
  };

  // 修改活動
  const handleUpdateEvent = async (eventId: string, data: EditEvent) => {
    const startTime = getDateTimeToTimeStamp(data.startDate, data.startTime);
    const endTime = data.endDate && data.endTime && getDateTimeToTimeStamp(data.endDate, data.endTime);

    const submitData = {
      city: data.city,
      physicalAddress: data.physicalAddress,
      startTime: startTime,
      endTime: endTime ? endTime : null,
      description: data.description ? data.description : '',
      isNetworkEvent: data.isNetworkEvent,
      timeZone: data.timeZone,
    };
    const res: any = await updateEvent(eventId, submitData);
    const successRes = handleShowInfoMessage(res);
    if (successRes) {
      // 修改成功
      setSuccessEventData(res.data.data);
      return true;
    }
    return false;
  };

  return {
    eventValues,
    handleChangeEventValues,

    showImg,
    handleChangeImage,

    handleAddNetworkEvent,
    handleAddPhysicalEvent,
    successEventData,

    handleUpdateEvent,
  };
}

export default useEvent;
