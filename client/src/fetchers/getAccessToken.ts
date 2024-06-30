export async function getAccessToken(code: string) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/auth/getAccessToken`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      }
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    throw Error("Error Occured While Fetching Access Token");
  }
}
