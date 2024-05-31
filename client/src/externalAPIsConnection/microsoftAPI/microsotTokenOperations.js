const msalConfig = {
  auth: {
    clientId: "109e64ef-c1ca-4077-b8c5-c4f28cf2b0ba", // Replace with your app's client ID
    authority: "https://login.microsoftonline.com/common", // Use your tenant ID if needed
    redirectUri:
      "https://bookmarks-manager-pkwm.onrender.com/bookmarks/connections", // Replace with your app's redirect URI
  },
  cache: {
    cacheLocation: "localStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: true, // Set this to true if you are having issues on IE11 or Edge
  },
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

const loginRequest = {
  scopes: ["Notes.Read", "Notes.ReadWrite", 'user.read'], // Add the required scopes
};

//! also works, but need refreshing access token function
// const handleMicrosoftLogin = () => {
//   msalInstance
//     .loginPopup(loginRequest)
//     .then((loginResponse) => {
//       console.log("id_token acquired at: " + new Date().toString());
//       console.log('loginResponse',loginResponse);

//       // Acquire token silently or by popup for API calls
//       msalInstance
//         .acquireTokenSilent(loginResponse)
//         .then((tokenResponse) => {
//           console.log("access_token acquired at: " + new Date().toString());
//           console.log('tokenResponse', tokenResponse);

//         })
//         .catch((error) => {
//           console.error(error);
//           if (error instanceof msal.InteractionRequiredAuthError) {
//             // Fallback to interaction when silent call fails
//             msalInstance
//               .acquireTokenPopup(loginRequest)
//               .then((tokenResponse) => {
//                 console.log(
//                   "access_token acquired at: " + new Date().toString()
//                 );
//                 console.log('tokenResponse',tokenResponse);

//                 // Use tokenResponse.accessToken to call Microsoft Graph API
//               })
//               .catch((error) => {
//                 console.error(error);
//               });
//           }
//         });
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };




const handleMicrosoftLogin = () => {
  msalInstance
    .loginPopup(loginRequest)
    .then((loginResponse) => {
      console.log("id_token acquired at: " + new Date().toString());
      console.log("loginResponse", loginResponse);

      // Set the active account
      const account = msalInstance.getAllAccounts()[0];
      msalInstance.setActiveAccount(account);

      // Acquire token silently or by popup for API calls
      acquireToken();
    })
    .catch((error) => {
      console.error(error);
    });
};

const acquireToken = () => {
  //! add logic to check if the token is expierd || maybe it already has that logic, i am not sure, it is chatgpt code
  const activeAccount = msalInstance.getActiveAccount();

  if (!activeAccount) {
    console.error("No active account! Login required.");
    return;
  }

  const tokenRequest = {
    scopes: ["Notes.Read", "Notes.ReadWrite", "user.read"],
    account: activeAccount,
  };

  msalInstance
    .acquireTokenSilent(tokenRequest)
    .then((tokenResponse) => {
      console.log("access_token acquired at: " + new Date().toString());
      console.log("tokenResponse", tokenResponse);
  const userMicrosoftTokensData = JSON.stringify({
    access_token: tokenResponse.accessToken,
    refresh_token: "---",
    expirationTime: tokenResponse.expiresOn,
  });
  localStorage.setItem("userMicrosoftTokensData", userMicrosoftTokensData);


      // Use tokenResponse.accessToken to call Microsoft Graph API
    })
    .catch((error) => {
      console.error(error);

      if (error instanceof msal.InteractionRequiredAuthError) {
        msalInstance
          .acquireTokenPopup(tokenRequest)
          .then((tokenResponse) => {
            console.log("access_token acquired at: " + new Date().toString());
            console.log("tokenResponse", tokenResponse);

            // Use tokenResponse.accessToken to call Microsoft Graph API
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
};
export { handleMicrosoftLogin, acquireToken };
