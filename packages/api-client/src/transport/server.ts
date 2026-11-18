import axios from "axios"

// Construct per request; never mutate the shared browser client's cookie headers.
export function createServerApiClient(baseURL: string, cookie?: string) {
  const url = new URL(baseURL)
  if (url.protocol !== "http:" && url.protocol !== "https:")
    throw new Error("Invalid API URL")
  return axios.create({
    baseURL: url.toString(),
    timeout: 30_000,
    headers: {
      Accept: "application/json",
      ...(cookie ? { Cookie: cookie } : {}),
    },
  })
}
