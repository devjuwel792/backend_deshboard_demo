// lib/request.ts
import axios from "axios";
import Cookies from "js-cookie";


// ✅ Create Axios instance
const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
  },
});

// ✅ Define request function
export const request = async ({ ...options }, router) => {
  client.defaults.headers.common.Authorization = `Bearer ${Cookies.get("uat")}`;
  const onSuccess = (response) => response.data;
  const onError = (error) => {
    if (error?.response?.status == 401) {
      Cookies.remove("uat");
      Cookies.remove("ue");
      Cookies.remove("account");
      localStorage.clear();
      // if (router) {
      //   router.push("/404");
      // }
    }
    // router && router.push('/404')
    return error;
  };
  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};


// export const postRequest = async (url, data = {}, config = {}, router) => {
//   client.defaults.headers.common.Authorization = `Bearer ${Cookies.get("uat")}`;
//   const onSuccess = (response) => response.data;
//   const onError = (error) => {
//     if (error?.response?.status == 401) {
//       Cookies.remove("uat");
//       Cookies.remove("ue");
//       Cookies.remove("account");
//       localStorage.clear();
//       // if (router) {
//       //   router.push("/404");
//       // }
//     }
//     return error;
//   };
//   try {
//     const response = await client.post(url, data, config);
//     return onSuccess(response);
//   } catch (error) {
//     return onError(error);
//   }
// };




