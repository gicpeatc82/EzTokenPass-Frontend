import { UseCreateEventTabState, UseDateTimeState, UseQuestionsState, UseStepState } from './types';
import { UseEventState, UseCheckAndAddEventState, TabValueText } from './types';
import useResponseMessage from './useResponseMessage';
import useAlertBox from './useAlertBox';
import { useTranslation } from 'react-i18next';
import { getDateTimeToTimeStamp } from '../utils/dateAddTime';
import { updateUserBannerImage } from '../api/imageAPI';

function useCheckAndAddEvent(): UseCheckAndAddEventState {
  const { t } = useTranslation();
  const { handleShowAlertBox, handleShowLoadingBox } = useAlertBox();
  const { handleGetAPISuccess, handleGetAPIShowError, handleShowInfoMessage } = useResponseMessage();

  function checkActiveStep0(question: UseQuestionsState) {
    const { questions1, handleAddUserSurveyResults } = question;
    if (!questions1.hostFrequency || !questions1.deployedContract || !questions1.howToKnow) {
      handleShowAlertBox(t('please fill out the field'), 'error');
    } else {
      handleAddUserSurveyResults(questions1);
      return true;
    }
  }

  function checkActiveStep1(createEvent: UseEventState) {
    const { eventValues, showImg } = createEvent;
    const isImgSizeLargerThan1MB = showImg['imageFile'] && showImg['imageFile'].size / 1024 / 1024 > 1;
    if (!eventValues.eventName || !showImg['imageFile'] || !eventValues.howPeople) {
      handleShowAlertBox(t('please fill out the field'), 'error');
    } else if (isImgSizeLargerThan1MB) {
      handleShowAlertBox(t('Images should be less than 1MB'), 'error');
    } else {
      return true;
    }
  }

  function checkActiveStep2(createEvent: UseEventState) {
    const { eventValues } = createEvent;
    if (!eventValues.chain || !eventValues.tokenAddress || !eventValues.contractType) {
      handleShowAlertBox(t('please fill out the field'), 'error');
    } else if (eventValues.tokenAddress.length !== 42) {
      handleShowAlertBox(t('NFT contract address is not correct'), 'error');
    } else {
      return true;
    }
  }

  function checkActiveStep3(
    createEvent: UseEventState,
    createDateTime: UseDateTimeState,
    page3Tab: UseCreateEventTabState
  ) {
    const { eventValues } = createEvent;
    const { timeValues } = createDateTime;
    const { tabValue } = page3Tab;
    const isPhysical = tabValue.eventPlace === TabValueText.physical;
    const isSingle = tabValue.eventDuring === TabValueText.single;
    if (!timeValues.startDate || !timeValues.startTime) {
      handleShowAlertBox(t('please fill out the time'), 'error');
    } else if (isSingle && (!timeValues.endDate || !timeValues.endTime)) {
      handleShowAlertBox(t('please fill out the time'), 'error');
    } else if (isPhysical && (!eventValues.city || !eventValues.address)) {
      handleShowAlertBox(t('please fill out the address'), 'error');
    } else if (!isPhysical && !eventValues.gmt) {
      handleShowAlertBox(t('please fill out the time zoom'), 'error');
    } else {
      return true;
    }
  }

  async function submitFinialData(
    createEvent: UseEventState,
    createDateTime: UseDateTimeState,
    page3Tab: UseCreateEventTabState,
    banner: string
  ): Promise<boolean | undefined> {
    const { eventValues, handleAddNetworkEvent, handleAddPhysicalEvent } = createEvent;
    const { timeValues } = createDateTime;
    const { tabValue } = page3Tab;
    const startTime = getDateTimeToTimeStamp(timeValues.startDate, timeValues.startTime);
    const endTime =
      timeValues.endDate && timeValues.endTime && getDateTimeToTimeStamp(timeValues.endDate, timeValues.endTime);
    const isPhysical = tabValue.eventPlace === TabValueText.physical;
    const isNetwork = tabValue.eventPlace === TabValueText.network;
    const baseData = {
      eventName: eventValues.eventName,
      chain: eventValues.chain,
      tokenAddress: eventValues.tokenAddress,
      usageCount: eventValues.usageCount,
      membersNumber: Number(eventValues.howPeople),
      description: eventValues.description,
      startTime: startTime,
      endTime: endTime ? endTime : '',
      bannerURL: banner,
    };
    if (isNetwork) {
      const data = Object.assign(baseData, { timeZone: eventValues.gmt });
      const successAddNetwork = await handleAddNetworkEvent(data);
      if (successAddNetwork) {
        return true;
      } else {
        return false;
      }
    }
    if (isPhysical) {
      const data = Object.assign(baseData, { city: eventValues.city, physicalAddress: eventValues.address });
      const successAddPhysical = await handleAddPhysicalEvent(data);
      if (successAddPhysical) {
        return true;
      } else {
        return false;
      }
    }
  }

  // 檢查新增的每一步驟，到成功新增
  const handleCheckValues = async (
    activeStep: number,
    question: UseQuestionsState,
    createEvent: UseEventState,
    createDateTime: UseDateTimeState,
    page3Tab: UseCreateEventTabState,
    handleNext: UseStepState['handleNext']
  ) => {
    const { showImg } = createEvent;

    switch (activeStep) {
      case 0: {
        const passFromChecking0 = checkActiveStep0(question);
        if (passFromChecking0) handleNext();
        break;
      }
      case 1: {
        const passFromChecking1 = checkActiveStep1(createEvent);
        if (passFromChecking1) handleNext();
        break;
      }
      case 2: {
        const passFromChecking2 = checkActiveStep2(createEvent);
        if (passFromChecking2) handleNext();
        break;
      }
      case 3: {
        const passFromChecking3 = checkActiveStep3(createEvent, createDateTime, page3Tab);
        if (passFromChecking3) handleNext();
        break;
      }
      case 4: {
        handleShowLoadingBox(true);
        if (showImg['imageFile']) {
          const imageData = { image: showImg['imageFile'] };
          const updateImage: any = await updateUserBannerImage(imageData);
          const successUpdateImg = handleGetAPIShowError(updateImage);

          if (successUpdateImg) {
            const banner = updateImage && updateImage.data.data.url;
            const successSubmitData = await submitFinialData(createEvent, createDateTime, page3Tab, banner);

            if (successSubmitData) {
              handleNext();
              handleShowLoadingBox(false);
            } else {
              handleShowLoadingBox(false);
            }
          } else {
            handleShowLoadingBox(false);
          }
        }
        break;
      }
    }
  };

  return {
    handleCheckValues,
  };
}

export default useCheckAndAddEvent;
