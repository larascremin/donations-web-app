import { server } from "./Variables";

export async function postData(url, body) {
  const fullUrl = server + url;
  const response = await fetch(fullUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const e = await response.json().catch(() => ({}));
    throw new Error(e.message);
  }

  return await response.json();
}
