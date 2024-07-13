export async function unSubscribeRepo(accessToken: string, repoLink: string) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/unsubscribeRepo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify({ repoLink }),
      }
    );

    if (!response.ok) {
      // If the response status is not OK, throw an error with the status text
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
    throw new Error("Error Occurred While Fetching Access Token");
  }
}
