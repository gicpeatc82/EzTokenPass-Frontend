import { useState } from 'react';
import { updateUserAvatarImage } from '../api/imageAPI';
import {
  getUserBoundAddress,
  getUserJoinedEvents,
  getUserCreateEvents,
  getUserEventNFTsAmount,
  deleteUserBoundAddress,
  removeUserEvent,
  updateUserName,
  updateUserAvatarURL,
} from '../api/userAPI';
import { UseEventState, UseUserState } from './types';
import useResponseMessage from './useResponseMessage';

function useUser(): UseUserState {
  const { handleGetAPISuccess, handleGetAPIShowError, handleShowInfoMessage } = useResponseMessage();
  const [userBoundAddress, setUserBoundAddress] = useState<UseUserState['userBoundAddress']>(null);
  const [userJoinedEvents, setUserJoinedEvents] = useState<UseUserState['userJoinedEvents']>(null);
  const [userCreateEvents, setUserCreateEvents] = useState<UseUserState['userCreateEvents']>(null);
  const [userEventNFTsAmount, setUserEventNFTsAmount] = useState<UseUserState['userEventNFTsAmount']>(null);

  const handleGetUserBoundAddress = () => {
    getUserBoundAddress().then((res: any) => {
      const successRes = handleGetAPISuccess(res);
      if (successRes && res.data.data.length !== 0) setUserBoundAddress(res.data.data);
    });
  };

  const handleGetUserEventNFTsAmount: UseUserState['handleGetUserEventNFTsAmount'] = (eventId) => {
    getUserEventNFTsAmount(eventId).then((res: any) => {
      const successRes = handleGetAPISuccess(res);
      if (successRes && res.data.data.length !== 0) setUserEventNFTsAmount(res.data.data);
    });
  };

  const handleGetUserJoinedEvents: UseUserState['handleGetUserJoinedEvents'] = (timeOrder) => {
    getUserJoinedEvents(timeOrder).then((res: any) => {
      const successRes = handleGetAPISuccess(res);
      if (successRes && res.data.data.length !== 0) setUserJoinedEvents(res.data.data);
    });
  };

  const handleGetUserCreateEvents: UseUserState['handleGetUserCreateEvents'] = () => {
    getUserCreateEvents().then((res: any) => {
      const successRes = handleGetAPISuccess(res);
      if (successRes && res.data.data.length !== 0) setUserCreateEvents(res.data.data);
    });
  };

  const handleDeleteUserBoundAddress: UseUserState['handleDeleteUserBoundAddress'] = (address) => {
    deleteUserBoundAddress(address).then((res: any) => {
      const successRes = handleShowInfoMessage(res);
      if (successRes && res.data.msg === 'OK') window.location.reload();
    });
  };

  const handleRemoveUserEvent: UseUserState['handleRemoveUserEvent'] = (eventId) => {
    removeUserEvent(eventId).then((res: any) => {
      const successRes = handleShowInfoMessage(res);
      if (successRes) handleGetUserCreateEvents();
    });
  };

  const handleUpdateUserName: UseUserState['handleUpdateUserName'] = (userName) => {
    updateUserName(userName).then((res: any) => {
      const successRes = handleShowInfoMessage(res);
      if (successRes) window.location.reload();
    });
  };

  const handleUpdateUserAvatar: UseUserState['handleUpdateUserAvatar'] = async (showImg) => {
    if (showImg['imageFile']) {
      const imageData = { image: showImg['imageFile'] };
      const updateImage: any = await updateUserAvatarImage(imageData);
      const successUpdateImg = handleGetAPIShowError(updateImage);
      if (successUpdateImg) {
        const photoURL = updateImage && updateImage.data.data.url;
        const res = await updateUserAvatarURL(photoURL);
        const successRes = handleShowInfoMessage(res);
        if (successRes) window.location.reload();
      }
    }
  };

  return {
    userBoundAddress,
    handleGetUserBoundAddress,
    userJoinedEvents,
    handleGetUserJoinedEvents,
    userCreateEvents,
    handleGetUserCreateEvents,
    userEventNFTsAmount,
    handleGetUserEventNFTsAmount,
    handleDeleteUserBoundAddress,
    handleRemoveUserEvent,
    handleUpdateUserName,
    handleUpdateUserAvatar,
  };
}

export default useUser;
