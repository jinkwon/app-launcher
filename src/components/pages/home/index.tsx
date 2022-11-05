import { Button } from '@mui/material';
import React, {
  useEffect,
  useState
} from 'react';
import {
  emit,
  listener
} from './app-utils'
import styles from './index.module.scss'

enum EventType {
  Message = 'message'
}

interface Props {
  children?: React.ReactNode;
}
const Home: React.FC<Props> = (props) => {
  const [payload, setPayload] = useState<any>({});

  useEffect(() => {
    listener((a: any) => {
      setPayload({...a});
    });
  }, []);

  const handleLogin = () => {
    emit(EventType.Message, {
      data: 'test'
    });
  };

  return (<>
    <div className={styles.container}>
      <main className={styles.main}>
        <Button variant={'contained'} onClick={handleLogin}>
          send message
        </Button>

        <div className={styles.title}>
          payload
        </div>

        <div className={styles.debug}>
          {JSON.stringify(payload)}
        </div>

        <Code/>
      </main>
    </div>
  </>);
};

export default Home;

const Code = () => {

  return <pre style={{
    backgroundColor: '#efefef',
  }}>{`
/**
 * app 에 json object 전달
 */
export function emit(type: string, payload: any) {
  window?.__BSTAGE_APP_SEND?.(type, payload);
  console.log(type, payload);
}

export function listener(cb: (data: any) => void) {
  window.addEventListener('onmessage', (data) => {
    console.log(data);
    cb(data);
  });
}
  `}</pre>;
};
