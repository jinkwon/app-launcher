import { Button } from '@mui/material';
import React, {
  useEffect,
  useState
} from 'react';
import {
  emit,
  isAndroid,
  isIOS,
  listener
} from './app-utils'
import styles from './index.module.scss'
import UAParser from 'ua-parser-js'

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
        {isAndroid() && <h2>android</h2>}
        {isIOS() && <h2>ios</h2>}

        <Button variant={'contained'} onClick={handleLogin}>
          send message
        </Button>

        <div className={styles.box}>
          <div className={styles.title}>payload</div>
          <div className={styles.debug}>
            {JSON.stringify(payload)}
          </div>
        </div>

        <div className={styles.box}>

          <div className={styles.title}>UA info</div>
          {JSON.stringify(new UAParser().getResult())}
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
