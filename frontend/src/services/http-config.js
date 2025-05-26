import axiosInstance from "./interceptor";

export async function fetchData(endpoint, method = "GET", body) {
  if (!endpoint) {
    return {};
  }
  try {
    const options = {
      method: method,
      data: {},
    };

    if (body) {
      options.data = body;
    }
    const response = await axiosInstance(endpoint, options);
    const data = response;

    return data;
  } catch (error) {
    console.log("error.status", error.status);
    if (error.status == 404) {
      console.log("error in http-confing", error);
    }
    return {};
  }
}

export function getData(endpoint) {
  return fetchData(endpoint);
}

export function postData(endpoint, body) {
  return fetchData(endpoint, "POST", body);
}

export function putData(endpoint, body) {
  return fetchData(endpoint, "PUT", body);
}

export function delData(endpoint, body = null) {
  return fetchData(endpoint, "DELETE", body);
}

export function patchData(endpoint, body) {
  return fetchData(endpoint, "PATCH", body);
}
