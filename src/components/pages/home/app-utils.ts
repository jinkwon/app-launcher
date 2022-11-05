
/**
 * intent 호출
 * @param props
 */
export function moveToApp(props: {
  stageId: string,
}) {

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
