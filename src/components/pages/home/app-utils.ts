import UAParser from 'ua-parser-js'

export function isMobile(parser: UAParser) {
  return isIOS(parser) || isAndroid(parser);
}

export function isIOS(parser: UAParser = new UAParser()) {
  return parser?.getOS().name === 'iOS';
}

export function isAndroid(parser: UAParser = new UAParser()) {
  return parser?.getOS().name === 'Android';
}

/**
 * intent 호출
 * @param props
 */
export function openBstageApp({ stageId }: {
  stageId: string,
}) {
  let appScheme = `bstage://browser/home?stageId=${stageId}`;
  console.log(appScheme);
  window.location.replace(appScheme);
}

const namespace = 'bstage';

/**
 * app 에 json object 전달
 */
export function emit(type: string, payload: any) {
  try {
    const obj = {
      type,
      payload,
    };

    const message = JSON.stringify(obj);

    if (isAndroid()) {
      window?.[namespace]?.appBstage?.(message);
    } else if (isIOS()) {
      window?.webkit?.messageHandlers?.[namespace]?.postMessage?.(message);
    }
    console.log(obj?.type, obj?.payload);
  } catch(e) {
    console.log(e);
  }
}

export function bindingAppUtils() {
  if (!window?.bstage) {
    const emit = (message: string) => {
      try {
        const doc = JSON.parse(message);
        const evt = new CustomEvent(`bstage.${doc.type}`, {
          detail: doc?.payload
        });
        window.dispatchEvent(evt);
      } catch(e) {
        console.log(e);
      }
    };
    window.bstage = {
      emit,
    };
  }
}

export function bindListener(type: string, cb: ({ type, payload }: { type: string, payload: any }) => void) {
  const handler = (e: any) => {
    cb({
      type,
      payload: {
        ...(e.detail || {})
      }
    });
  };
  window.addEventListener(`bstage.${type}`, handler);
  return handler;
}

export function unbindListener(type: string, cb: any) {
  window?.removeEventListener(`bstage.${type}`, cb);
}
