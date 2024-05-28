const msalConfig = {
  auth: {
    clientId: "109e64ef-c1ca-4077-b8c5-c4f28cf2b0ba", // Replace with your app's client ID
    authority:
      "https://login.microsoftonline.com/f8cdef31-a31e-4b4a-93e4-5f571e91255a", // Use your tenant ID if needed
    redirectUri: "http://localhost:5173/bookmarks/connections", // Replace with your app's redirect URI
  },
  cache: {
    cacheLocation: "localStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: true, // Set this to true if you are having issues on IE11 or Edge
  },
};

const msalInstance = new msal.PublicClientApplication(msalConfig);
