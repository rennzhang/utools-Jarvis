import JsonToTS from "json-to-ts";
import curl_to_json from "curl-to-json-object";
// 大小首字母转换函数
const changeCase = (str: string) => {
  if (typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

//取url里的参数，返回一个对象
const getUrlParams = (url: string) => {
  // const url: string = 'https://www.baidu.com/?token=5ytimbcdzbwg&name=华为技术有限公司';
  const obj: Record<string, any> = {};

  if (url.lastIndexOf("?") === -1 || url.lastIndexOf("?") === url.length - 1) {
    return obj;
  }

  const search = url.substring(url.lastIndexOf("?") + 1);
  const params = search.split("&");

  for (let i = 0; i < params.length; i++) {
    const pair = params[i].split("=");
    obj[pair[0]] = pair[1];
  }

  return obj;
};

const parseToApiFunc = (apiJson:{url:string,data:any,header:any}) => {
  let { url, data } = apiJson;

  let method =
    apiJson.header["Content-Type"] == "application/json" ? "POST" : "GET";
  if (method === "GET") {
    data = getUrlParams(url);
    url = url.split("?")[0];
  }
  // 匹配域名正则
  const reg = /^(http|https):\/\/(.*?)\//;
  const urlArr = url.replace(reg, "").split("/");
  const apiPath = urlArr.slice(1).join("/");

  let result = "";

  let funcName = changeCase(urlArr[urlArr.length - 1]);
  let paramsTypeName = `${funcName}Params`;

  JsonToTS(data).forEach((item) => {
    result +=
      "export " + item.replace("RootObject", paramsTypeName) + "\r\n\r\n";
  });

  result += `export const requestCommon${funcName} = (params: ${paramsTypeName}) => \r\n`;
  result += `  http.${method.toLowerCase()}<any>(\`${"${LCGETWAY}"}/${apiPath}\`, params);\r\n`;
  return result + `\r\n`;
};

const dispatchCURL2Func = (payload: string) => {
  utools.hideMainWindow();
  const apiJson = curl_to_json(payload);
  const genFunc = parseToApiFunc(apiJson);
  utools.copyText(genFunc);
  utools.outPlugin();

  // 判断是否是mac系统
  utools.simulateKeyboardTap("v", process.platform === "darwin"?"command":"control")
};
export default dispatchCURL2Func;
