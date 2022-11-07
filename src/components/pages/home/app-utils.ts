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


/**
 * app 에 json object 전달
 */
export function emit(type: string, payload: any) {
  const namespace = 'Android';

  const message = {
    type,
    payload,
  };

  try {
    if (isAndroid()) {
      window?.[namespace]?.appBstage?.(message);
    } else if (isIOS()) {
      window?.webkit?.messageHandlers?.['bstage']?.postMessage?.(message);
    }
  } catch(e) {
    console.log(e);
  }

  console.log(message?.type, message);
}

export function listener(cb: (data: any) => void) {
  window.addEventListener('bstage.message', (data) => {
    console.log(data);
    cb(data);
  });
}
