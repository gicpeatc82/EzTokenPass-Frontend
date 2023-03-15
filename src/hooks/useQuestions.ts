import { useState } from 'react';
import { Question1State, UseQuestionsState } from './types';
import useResponseMessage from './useResponseMessage';
import { addUserSurveyResults } from '../api/questionAPI';

function useQuestions(): UseQuestionsState {
  const { handleGetAPISuccess } = useResponseMessage();
  const [questions1, setQuestions1] = useState<Question1State>({
    hostFrequency: '',
    deployedContract: 'false',
    howToKnow: '',
  });

  const handleChangeQuestions1 = (prop: keyof Question1State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestions1({ ...questions1, [prop]: event.target.value });
  };

  const handleAddUserSurveyResults = (data: Question1State) => {
    addUserSurveyResults(data).then((res) => {
      const successRes = handleGetAPISuccess(res);
      console.log(successRes);
    });
  };

  return { questions1, handleChangeQuestions1, handleAddUserSurveyResults };
}

export default useQuestions;
