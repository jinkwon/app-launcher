/// <reference types="styled-components/cssprop" />

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;

  const src: string;
  export default src;
}

declare module '*.html' {
  const content: string;
  export default content;
}

declare module '*.json' {
  const content: any;
  export default content;
}

interface CSSCustomProperties extends React.CSSProperties {
  // Typescript 4.4 Template String Pattern Index Signature
  [propName: `--${string}`]: string | number;
}

interface Window {
  bstage: any;
  webkit: any;
}

declare var window: Window;
