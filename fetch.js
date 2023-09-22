export const fetchApi = async (url)=> {
    const response = await fetch(url);
    const datos = response.json();
    return datos;
}