export async function subscribeRepoPostReq(
  accessToken: string,
  repoLink: string,
  currentToken: string
) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/subscribeRepo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify({ repoLink, token: currentToken }),
      }
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    throw Error("Error Occured While Fetching Access Token");
  }
}
