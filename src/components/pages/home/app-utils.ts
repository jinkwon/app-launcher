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
  let appScheme = '';

  if (isIOS()) {
    appScheme = `bmf://bstage/open?stageId=${stageId}`;
  } else if (isAndroid()) {
    appScheme = `intent://bstage/open?stageId=${stageId}`;
  }
  window.location.replace(appScheme);
}

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
