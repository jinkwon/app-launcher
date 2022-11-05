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
          paypload
        </div>

        <div className={styles.debug}>
          {JSON.stringify(payload)}
        </div>
      </main>
    </div>
  </>);
};

export default Home;
