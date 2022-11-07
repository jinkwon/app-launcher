import { Button } from '@mui/material';
import React, {
  useEffect,
  useState
} from 'react';
import LogsContainer from './templates/LogsContainer';
import {
  bindAppUtils,
  bindListener,
  emit,
  isAndroid,
  isIOS,
  openBstageApp,
  unbindListener
} from './app-utils'
import styles from './index.module.scss'
import UAParser from 'ua-parser-js'

enum EventType {
  Login = 'login',
  Logout = 'logout',
  Close = 'close',
  IsBstage = 'isBstage',
}

enum AppEventType {
  Message = 'message',
  IsBstage = 'isBstage',
}

interface StageInfo {
  stageId: string;
}

const stageInfo: StageInfo = {
  stageId: 'bmf',
};

interface Props {
  children?: React.ReactNode;
}

const Home: React.FC<Props> = (props) => {
  const [payload, setPayload] = useState<any>({});

  useEffect(() => {
    bindAppUtils();

    const handlers = [
      bindListener(AppEventType.Message, ({ type, payload }) => {
        console.log('from-app', type, payload);
        setPayload({
          type,
          payload,
        });
      }),
      bindListener(AppEventType.IsBstage, ({ type, payload }) => {
        console.log('from-app', type, payload);
        setPayload({
          type,
          payload,
        });
      }),
    ];

    emit(EventType.IsBstage, {
      stageInfo,
    });

    console.log('initialized', JSON.stringify(window?.['bstage']));

    return () => {
      handlers.forEach(h => unbindListener(h.type, h.handler))
    };
  }, []);

  const handleTestEvent = () => {
    try {
      window?.bstage?.emit(JSON.stringify({
        type: AppEventType.Message,
        payload: {
          test: 1,
        }
      }));
    } catch (e) {

    }
  };

  const handleIsBstage = () => {
    // 최초 접근시 stage 정보 제공
    emit(EventType.IsBstage, {
      stageInfo,
    });
  };

  const handleLogin = () => {
    const accessToken = '';
    const refreshToken = '';

    emit(EventType.Login, {
      stageInfo,
      accessToken,
      refreshToken,
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

          <Button color={'secondary'} variant={'contained'} onClick={handleTestEvent}>
            앱 이벤트 테스트
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
