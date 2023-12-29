import dispatchCURL2Func from "../package/cURL2Func";

// 这个方法会自动挂在到window.preload,在vue中可以这么调用 window.preload.handlePluginEnter
export async function handlePluginEnter({
  code,
  type,
  payload,
}: Parameters<Parameters<typeof utools.onPluginEnter>[0]>[0]) {
  switch (code) {
    case "cURL2Func":
      dispatchCURL2Func(payload);
      break;

    default:
      // window.dispatchEvent(
      //   new CustomEvent("tool-plugin-enter", { detail: "some thing" })
      // );
  }
}

utools.onPluginEnter(handlePluginEnter);

utools.onPluginOut(async (exit) => {});
