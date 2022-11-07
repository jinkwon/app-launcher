import { Button } from '@mui/material';
import React, {
  useEffect,
  useState
} from 'react';
import LogsContainer from './templates/LogsContainer';
import {
  emit,
  isAndroid,
  isIOS,
  listener,
  openBstageApp
} from './app-utils'
import styles from './index.module.scss'
import UAParser from 'ua-parser-js'

enum EventType {
  Login = 'login',
  Logout = 'logout',
  Close = 'close',
  IsBstage = 'isBstage',
}

const stageInfo = {
  stageId: 'bmf'
};

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

  const handleIsBstage = () => {
    // 최초 접근시 stage 정보 제공
    emit(EventType.IsBstage, {
      stageInfo,
    });
  };

  const handleLogin = () => {
    emit(EventType.Login, {
      stageInfo,
    });
  };

  const handleLogout = () => {
    emit(EventType.Logout, {
      stageInfo,
    });
  };

  const handleClose = () => {
    emit(EventType.Close, {
      stageInfo,
    });
  };

  const handleOpenApp = () => {
    openBstageApp({
      stageId: 'bmf'
    });
  };

  return (<>
    <div className={styles.container}>
      <main className={styles.main}>
        {isAndroid() && <h2>android</h2>}
        {isIOS() && <h2>ios</h2>}

        <div className={styles.buttons}>
          <Button variant={'contained'} onClick={handleIsBstage}>
            isBstage
          </Button>

          <Button variant={'contained'} onClick={handleLogin}>
            로그인할꼬야
          </Button>

          <Button variant={'contained'} onClick={handleLogout}>
            로그아웃할꼬야
          </Button>
          <Button variant={'contained'} onClick={handleClose}>
            나갈꼬야
          </Button>

          <Button color={'secondary'} variant={'contained'} onClick={handleOpenApp}>
            Open App
          </Button>
        </div>

        <div className={styles.box}>
          <div className={styles.title}>payload</div>
          <div className={styles.debug}>
            {JSON.stringify(payload)}
          </div>
        </div>

        <div className={styles.box}>
          <LogsContainer/>
        </div>

        <div className={styles.box}>
          <div className={styles.title}>UA info</div>
          {JSON.stringify(new UAParser().getResult())}
        </div>


      </main>
    </div>
  </>);
};

export default Home;
