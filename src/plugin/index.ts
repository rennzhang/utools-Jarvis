import dispatchCURL2Func from "./cURL2Func";
export const setupPlugin = () => {
  utools.onPluginEnter(({ code, type, payload }) => {
    switch (code) {
      case "cURL2Func":
        dispatchCURL2Func(payload);
        break;
      default:
    }
  });
};

