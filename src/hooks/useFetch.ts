export async function useFetch(url: string) {
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
}
