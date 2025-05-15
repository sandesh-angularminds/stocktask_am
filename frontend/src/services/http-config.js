import axiosInstance from "./interceptor";

export async function fetchData(
  endpoint,
  method = "GET",
  body
) {

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

export function delData(endpoint, body=null) {
  return fetchData(endpoint, "DELETE", body);
}

export function patchData(endpoint, body) {
  return fetchData(endpoint, "PATCH", body);
}