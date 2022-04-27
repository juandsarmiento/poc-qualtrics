/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import Qualtrics from 'react-native-qualtrics';

interface NpsProps {
  brandId: string;
  projectId: string;
  storeId: string;
  interceptorId: string;
}
interface IEvaluateInterceptor {
  [interceptorId: string]: {
    creativeType: string | null;
    passed: boolean;
    surveyUrl: string | null;
  };
}
interface IInitializeQualtrics {
  (brandId: string, projectId: string, storeId: string): Promise<void>;
}

interface IEvaluateQualtrics {
  (): Promise<IEvaluateInterceptor>;
}

interface ISetNumberQualtrics {
  (key: 'NPS', value: number): void;
}

const initializeQualtrics: IInitializeQualtrics = (
  brandId,
  projectId,
  storeId,
) =>
  new Promise<void>(resolve => {
    console.log('Initializing Qualtrics ...');
    (Qualtrics as any).initializeProjectWithExtRefId(
      brandId,
      projectId,
      storeId,
      (results: any) => {
        console.log('Initialization results', results);
        resolve();
      },
    );
  });

const evaluateQualtrics: IEvaluateQualtrics = () =>
  new Promise<IEvaluateInterceptor>(resolve => {
    console.log('Evaluating Qualtrics ...');
    (Qualtrics as any).evaluateProject((results: any) => {
      console.log('Evaluation results', results);
      resolve(results);
    });
  });

const setNumber: ISetNumberQualtrics = (key, value) => {
  Qualtrics.setNumber(key, value);
};

const Nps: React.FC<NpsProps> = props => {
  useEffect(() => {
    const initialize = async () => {
      try {
        await initializeQualtrics(
          props.brandId,
          props.projectId,
          props.storeId,
        );
        setNumber('NPS', 5);
        const results = await evaluateQualtrics();
        console.log('results', results);
        if (results[props.interceptorId].passed) {
          console.log('Results passed!!!');
          Qualtrics.display();
        }
      } catch (err) {
        console.error(err);
      }
    };
    initialize();
  }, []);

  return <></>;
};

export {Nps};
