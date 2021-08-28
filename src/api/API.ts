import { ApiConstants } from "./ApiConstants";
import axios from "axios";
import { setupInterceptorsTo } from "./Interceptors";

setupInterceptorsTo(axios);

const url = ApiConstants.BASE_URL;

export default function api(
  path: string,
  params: any,
  method: any,
  headers: any = {}
) {
  const fullUrl = url + path;
  return axios({
    data: params,
    method: method,
    url: fullUrl,
    headers: headers,
  }).then((res: any) => {
    if (res) {
      return res.data;
    } else {
      throw Object.assign(new Error("Invalid Response"), { code: 402 });
    }
  });
}
