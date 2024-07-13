export async function getUser(accessToken: string) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/auth/getUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    throw Error("Error Occured While Fetching Access Token");
  }
}
