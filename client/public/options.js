// document.addEventListener("DOMContentLoaded", function () {
//   const githubUrlInput = document.getElementById("repo-input");
//   const saveBtn = document.getElementById("save-btn");
//   const urlList = document.getElementById("url-list");

//   // Function to display the URLs in the HTML
//   function displayUrls(urls) {
//     // Clear the current list
//     urlList.innerHTML = "";

//     // Map the array to HTML elements and append them to the DOM
//     urls.forEach((url, index) => {
//       const urlItem = document.createElement("div");
//       urlItem.textContent = `${index + 1}. ${url}`;
//       urlList.appendChild(urlItem);
//     });
//   }

//   // Function to fetch and display URLs from chrome.storage.sync
//   function fetchAndDisplayUrls() {
//     chrome.storage.sync.get(["githubUrl"], function (result) {
//       const urls = result.githubUrl || [];
//       displayUrls(urls);
//     });
//   }

//   // Add event listener to the save button
//   saveBtn.addEventListener("click", () => {
//     const newUrl = githubUrlInput.value.trim();

//     if (newUrl) {
//       // Retrieve the existing array
//       chrome.storage.sync.get(["githubUrl"], function (result) {
//         let urls = result.githubUrl || [];

//         // Append the new URL to the array
//         urls.push(newUrl);

//         // Save the updated array back to chrome.storage.sync
//         chrome.storage.sync.set({ githubUrl: urls }, function () {
//           if (chrome.runtime.lastError) {
//             console.error(
//               "Error saving updated array:",
//               chrome.runtime.lastError
//             );
//           } else {
//             console.log("New URL appended to githubUrl array");
//             // Clear the input field
//             githubUrlInput.value = "";
//             // Fetch and display the updated list
//             fetchAndDisplayUrls();
//           }
//         });
//       });
//     } else {
//       console.error("Invalid URL input:", newUrl);
//     }
//   });

//   // Fetch and display the URLs when the page loads
//   fetchAndDisplayUrls();
// });
