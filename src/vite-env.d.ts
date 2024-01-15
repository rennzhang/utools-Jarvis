/// <reference types="vite/client" />
interface Window {
    preload: {}
}


declare module 'curl-to-json-convert' {
    export default function convertToJson(curlString: string): any;
  }