export default function Home() {
  // background.js

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "open_github_auth") {
      const url = `https://github.com/login/oauth/authorize?client_id=${message.clientId}&scope=repo read:org admin:repo_hook`;
      chrome.tabs.create({ url }, () => {
        sendResponse({ status: "success" });
      });
      return true; // Keep the message channel open for sendResponse
    }
  });

  return <div></div>;
}
