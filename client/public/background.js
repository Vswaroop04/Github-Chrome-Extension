chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(sender);
  if (message.action === "open_github_auth") {
    const url = `https://github.com/login/oauth/authorize?client_id=${message.clientId}&scope=repo read:org admin:repo_hook`;

    // Open the URL in a new tab
    chrome.tabs.create({ url: url });
  }
});

// background.js

// function notifyPopupWithAccessToken(accessToken) {
//   const message = {
//     type: "ACCESS_TOKEN",
//     payload: accessToken,
//   };

//   chrome.runtime.sendMessage(message, function (response) {
//     console.log("Response from popup:", response);
//   });
// }

// function checkForAccessToken(callback) {
//   chrome.storage.local.get("accessToken", function (items) {
//     if (items.accessToken) {
//       callback(true, items.accessToken);
//     } else {
//       callback(false, null);
//     }
//   });
// }

// function initiateOAuthFlow(url) {
//   try {
//     chrome.identity.launchWebAuthFlow(
//       {
//         url,
//         interactive: true,
//       },
//       function (redirect_url) {
//         if (chrome.runtime.lastError) {
//           console.error(
//             "Error launching web auth flow:",
//             chrome.runtime.lastError.message
//           );
//           return;
//         }

//         if (redirect_url) {
//           console.log("Redirect URL:", redirect_url);
//           const urlParams = new URLSearchParams(redirect_url.split("#")[1]);
//           const accessToken = urlParams.get("access_token");
//           if (accessToken) {
//             chrome.storage.local.set({ accessToken: accessToken }, function () {
//               console.log("Access token saved successfully.");
//               notifyPopupWithAccessToken(accessToken); // Notify popup with access token
//             });
//           }
//         } else {
//           console.error("OAuth2 flow failed.");
//         }
//       }
//     );
//   } catch (error) {
//     console.error("Error launching web auth flow:", error.message);
//   }
// }
