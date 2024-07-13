import { useEffect, useState } from "react";
import { getAccessToken } from "../fetchers/getAccessToken";
import { getToken, messaging } from "../fireBaseConfig";
import "tailwindcss/tailwind.css";
import { subscribeRepoPostReq } from "../fetchers/subscribeRepo";
import { toast } from "react-toastify";
import { getUser } from "../fetchers/getUser";
import { unSubscribeRepo } from "../fetchers/unsubscribeRepo";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [repos, setRepos] = useState<string[]>([]);
  const [subscribedRepos, setSubscribedRepos] = useState<string[]>([]);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        setLoading(true);

        const data = await getUser(accessToken);
        if (
          data &&
          Array.isArray(data.userRepos) &&
          data.userRepos.length > 0
        ) {
          setRepos(data.userRepos);
          setSubscribedRepos(data.subscribedRepos);
          setLoading(false);
          return;
        } else {
          localStorage.removeItem("accessToken");
          setLoading(false);
          window.location.href = "/";
        }
      } else {
        if (code) {
          setLoading(true);
          try {
            const data = await getAccessToken(code);
            if (
              data &&
              Array.isArray(data.userRepos) &&
              data.userRepos.length > 0
            ) {
              setRepos(data.userRepos);
              setSubscribedRepos(data.subscribedRepos);
              localStorage.setItem("accessToken", data.accessToken);
            } else {
              toast.error("Failed to fetch valid user repositories");
              throw new Error("Failed to fetch valid user repositories");
            }
          } catch (error) {
            console.error("Error fetching access token:", error);
            toast.error("Error fetching access token");
          } finally {
            setLoading(false);
          }
        }
      }
    };

    fetchAccessToken();
  }, []);

  function loginWithGithub() {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${
        import.meta.env.VITE_GITHUB_CLIENT_ID
      }&scope=repo read:org admin:repo_hook`
    );
  }

  async function unSubscribeRep(repo: string) {
    const accTok = localStorage.getItem("accessToken");
    if (accTok) {
      try {
        await toast.promise(unSubscribeRepo(accTok, repo), {
          pending: "Unsubscribing...",
          success: "Unsubscribed successfully!",
          error: "Operation failed!",
        });

        setSubscribedRepos((prevSubscribedRepos) =>
          prevSubscribedRepos.filter((r) => r !== repo)
        );
        setRepos((prevRepos) => [...prevRepos, repo]);
      } catch (error) {
        console.error("Failed to unsubscribe:", error);
      }
    } else {
      toast.error("Failed to fetch access token");
    }
  }
  async function handleClick(repo: string) {
    // Function to handle click action
    const vapidKey =
      "BOyXlcVoLuoNsGDYtiD8LELrbxXgMKnQBeb0NnNu9qkDUx9fToam1uHja_6TBlr9oDWc9jVDCUdQpxTlmIDsNpY";
    console.log("Button clicked for repo:", repo);
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/firebase-messaging-sw.js");
      if ("Notification" in window) {
        Notification.requestPermission()
          .then((permission) => {
            if (permission === "denied") {
              toast.error("The user explicitly denied the permission request.");
              return;
            }
            if (permission === "granted") {
              getToken(messaging, { vapidKey })
                .then(async (currentToken) => {
                  if (currentToken) {
                    const at = localStorage.getItem("accessToken");
                    if (!at) {
                      toast.error("No Access Token Found");
                      return;
                    }

                    // Use toast.promise to handle the loading state
                    toast.promise(
                      (async () => {
                        const repoSub = await subscribeRepoPostReq(
                          at,
                          repo,
                          currentToken
                        );
                        if (repoSub.message !== "Webhook Created") {
                          throw new Error(repoSub.message);
                        } else {
                          setSubscribedRepos((prevRepos) => [
                            ...prevRepos,
                            repo,
                          ]);
                          setRepos((prevSubscribedRepos) =>
                            prevSubscribedRepos.filter((r) => r !== repo)
                          );
                        }
                      })(),
                      {
                        pending: "Subscribing...",
                        success: "Subscribed successfully!",
                        error: "Subscription failed!",
                      }
                    );
                  } else {
                    toast.error(
                      "No registration token available. Request permission to generate one."
                    );
                  }
                })
                .catch((err) => {
                  console.error(
                    "An error occurred while retrieving token.",
                    err
                  );
                  toast.error("An error occurred while retrieving token.");
                });
              console.info("The user accepted the permission request.");
            }
          })
          .catch((error) => {
            console.error("Error requesting notification permission:", error);
            toast.error("Error requesting notification permission:.");
          });
      } else {
        console.error("Notifications are not supported in this browser.");
        toast.error("Notifications are not supported in this browser.");
      }
    }
  }

  return (
    <>
      <div className=" top-0 left-0 w-full bg-gray-300 bg-opacity-50 flex items-start justify-center">
        <div className="  p-4 w-full mx-auto">
          <p className="text-gray-700 text-center">
            Note: The push notification service has been migrated from the
            extension to the web due to new Chrome Manifest V3 restrictions that
            do not support non-Google authentication logins.
          </p>
        </div>
      </div>

      {loading ? (
        <div
          role="status"
          className="min-h-screen flex items-center justify-center bg-gray-900 text-white"
        >
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="max-w-4xl w-full mx-auto p-8 rounded-lg shadow-lg bg-gray-800">
              {repos?.length > 0 ? (
                <div>
                  {subscribedRepos?.length > 0 && (
                    <>
                      <h1 className="text-center text-lg py-4 font-medium">
                        {" "}
                        Subscribed Repos{" "}
                      </h1>
                      <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                              Repository Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                          {subscribedRepos?.map((repo, index) => {
                            const repoName = repo.substring(
                              repo.indexOf("/") + 1
                            );
                            const repoNameAfter = repoName.substring(
                              repoName.indexOf("/") + 1
                            );
                            const repoNameAfterSecondSlash =
                              repoNameAfter.substring(
                                repoNameAfter.indexOf("/") + 1
                              );

                            return (
                              <tr key={index} className="hover:bg-gray-700">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                                  {repoNameAfterSecondSlash}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                                  <button
                                    onClick={() => unSubscribeRep(repo)}
                                    className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg text-white"
                                  >
                                    UnSubscribe
                                  </button>
                                </td>
                                {/* Add more columns as needed */}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </>
                  )}

                  <h1 className="text-center text-lg py-4 font-medium">
                    {" "}
                    Repositries{" "}
                  </h1>

                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Repository Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {repos.map((repo, index) => {
                        const repoName = repo.substring(repo.indexOf("/") + 1);
                        const repoNameAfter = repoName.substring(
                          repoName.indexOf("/") + 1
                        );
                        const repoNameAfterSecondSlash =
                          repoNameAfter.substring(
                            repoNameAfter.indexOf("/") + 1
                          );

                        return (
                          <tr key={index} className="hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                              {repoNameAfterSecondSlash}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                              <button
                                onClick={() => handleClick(repo)}
                                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg text-white"
                              >
                                Subscribe
                              </button>
                            </td>
                            {/* Add more columns as needed */}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <button
                    onClick={loginWithGithub}
                    className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg text-white"
                  >
                    Login with GitHub
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
