const msalConfig = {
  auth: {
    clientId: "109e64ef-c1ca-4077-b8c5-c4f28cf2b0ba", // Replace with your app's client ID
    authority: "https://login.microsoftonline.com/common", // Use your tenant ID if needed
    redirectUri: "http://localhost:5173/bookmarks/connections", // Replace with your app's redirect URI
  },
  cache: {
    cacheLocation: "localStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: true, // Set this to true if you are having issues on IE11 or Edge
  },
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

const loginRequest = {
  scopes: ["Notes.Read", "Notes.ReadWrite"], // Add the required scopes
};


const handleMicrosoftLogin = () => {
  msalInstance
    .loginPopup(loginRequest)
    .then((loginResponse) => {
      console.log("id_token acquired at: " + new Date().toString());
      console.log(loginResponse);

      // Acquire token silently or by popup for API calls
      msalInstance
        .acquireTokenSilent(loginRequest)
        .then((tokenResponse) => {
          console.log("access_token acquired at: " + new Date().toString());
          console.log(tokenResponse);

          // Use tokenResponse.accessToken to call Microsoft Graph API
        })
        .catch((error) => {
          console.error(error);
          if (error instanceof msal.InteractionRequiredAuthError) {
            // Fallback to interaction when silent call fails
            msalInstance
              .acquireTokenPopup(loginRequest)
              .then((tokenResponse) => {
                console.log(
                  "access_token acquired at: " + new Date().toString()
                );
                console.log(tokenResponse);

                // Use tokenResponse.accessToken to call Microsoft Graph API
              })
              .catch((error) => {
                console.error(error);
              });
          }
        });
    })
    .catch((error) => {
      console.error(error);
    });
};
export { handleMicrosoftLogin };
