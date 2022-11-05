import { Button } from '@mui/material'
import {
  useEffect,
  useState
} from 'react';
import {
  emit,
  listener
} from '../src/app-utils'

import styles from '../styles/Home.module.css'

enum EventType {
  Message = 'message'
}

export default function Home() {
  const [payload, setPayload] = useState<any>({});

  useEffect(() => {

    listener((a) => {
      setPayload({...a});
    });
  }, []);

  const handleLogin = () => {
    emit(EventType.Message, {
      data: 'test'
    });
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {JSON.stringify(payload)}
        <Button variant={'contained'} onClick={handleLogin}>
          send message
        </Button>
      </main>
    </div>
  )
}

