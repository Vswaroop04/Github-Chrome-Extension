import { useEffect, useState } from "react";
import { getAccessToken } from "../fetchers/getAccessToken";

// Import Tailwind CSS styles
import "tailwindcss/tailwind.css";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [repos, setRepos] = useState<string[]>([]);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
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
            chrome.storage.local.set({ accessToken: data.accessToken }, () => {
              console.log("Access token stored in Chrome storage");
            });
          } else {
            throw new Error("Failed to fetch valid user repositories");
          }
        } catch (error) {
          console.error("Error fetching access token:", error);
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 1700);
        }
      }
    };

    fetchAccessToken();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Empty dependency array ensures useEffect runs once on component mount

  function loginWithGithub() {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${
        import.meta.env.VITE_GITHUB_CLIENT_ID
      }&scope=repo read:org admin:repo_hook`
    );
  }

  function handleClick(repo: string) {
    // Function to handle click action
    console.log("Button clicked for repo:", repo);
    // Add your logic here
  }

  return (
    <>
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
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
          <div className="max-w-4xl w-full mx-auto p-8 rounded-lg shadow-lg bg-gray-800">
            {repos.length > 0 ? (
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
                    const repoNameAfterSecondSlash = repoNameAfter.substring(
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
      )}
    </>
  );
}
