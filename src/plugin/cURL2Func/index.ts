import JsonToTS from "json-to-ts";
import { upperFirst } from "lodash-es";
import convertToJson from "@bany/curl-to-json";

const parseToApiFunc = (cURL: string) => {
  let result = "";

  const { url, data, params, method } = convertToJson(cURL);
  // 匹配域名正则
  const urlArr = url.replace(/^(http|https):\/\/(.*?)\//, "").split("/");
  const apiPath = urlArr.slice(1).join("/");

  const funcName = upperFirst(urlArr[urlArr.length - 1]);
  const paramsTypeName = `${funcName}Params`;

  JsonToTS(data || params, { rootName: paramsTypeName }).forEach((item) => {
    // 将 interface paramsTypeName { 转换为 export type paramsTypeName = {
    result += item.replace("interface", "export type").replace("{", "= {");
    result += "\n";
  });

  result += `
/** */
export const requestCommon${funcName} = (params: ${paramsTypeName}) => 
  http.${method!.toLowerCase()}<any>(\`${"${LCGETWAY}"}/${apiPath}\`, params);

`;

  return result;
};

const dispatchCURL2Func = (payload: string) => {
  try {
    const result = parseToApiFunc(payload);
    console.log(result);
    utools.hideMainWindow();
    
    utools.copyText(result);
  
    utools.outPlugin();
  
    // 判断是否是mac系统
    utools.simulateKeyboardTap(
      "v",
      utools.isMacOS() ? "command" : "control"
    );
  } catch (error) {
    
  alert(error)


  }
    
};
export default dispatchCURL2Func;
