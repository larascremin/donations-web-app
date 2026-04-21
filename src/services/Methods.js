import api from "./api";

export async function postData(url, body) {
  const response = await api.post(url, body);
  return response.data;
}
