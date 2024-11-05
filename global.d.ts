declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage: (message: string) => void;
    };
  }
}
interface Window {
  ReactNativeWebView?: {
    postMessage: (message: string) => void;
  };
}
