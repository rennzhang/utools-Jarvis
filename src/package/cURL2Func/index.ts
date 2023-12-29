import JsonToTS from "json-to-ts";
import { upperFirst } from "lodash-es";
import convertToJson from "curl-to-json-convert";

const parseToApiFunc = (cURL: string) => {
  let result = "";

  const { url, data, queries, method } = convertToJson(cURL);

  // 匹配域名正则
  const urlArr = url.replace(/^(http|https):\/\/(.*?)\//, "").split("/");
  const apiPath = urlArr.slice(1).join("/");

  const funcName = upperFirst(urlArr[urlArr.length - 1]);
  const paramsTypeName = `${funcName}Params`;

  JsonToTS(data || queries, { rootName: paramsTypeName }).forEach((item) => {
    // 将 interface paramsTypeName { 转换为 export type paramsTypeName = {
    result += item.replace("interface", "export type").replace("{", "= {");
    result += "\n";
  });

  result += `
/** */
export const requestCommon${funcName} = (params: ${paramsTypeName}) => 
  http.${method.toLowerCase()}<any>(\`${"${LCGETWAY}"}/${apiPath}\`, params);

`;

  return result;
};

const dispatchCURL2Func = (payload: string) => {
  utools.hideMainWindow();

  utools.copyText(parseToApiFunc(payload));

  utools.outPlugin();

  // 判断是否是mac系统
  utools.simulateKeyboardTap(
    "v",
    process.platform === "darwin" ? "command" : "control"
  );
};
export default dispatchCURL2Func;
