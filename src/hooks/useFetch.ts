export async function useFetch(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}
