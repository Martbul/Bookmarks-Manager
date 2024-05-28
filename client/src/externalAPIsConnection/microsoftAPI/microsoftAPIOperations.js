import { acquireToken } from './microsotTokenOperations'


// const getUserMicrosoftSavedNotes = async (accessToken) => {
//   await acquireToken();
//   const endpoint = "https://graph.microsoft.com/v1.0/me/onenote/notebooks";

//   fetch(endpoint, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       return data;
//     })

//     .catch((error) => {
//       console.error("Error fetching notes:", error);
//     });
// };


const getUserMicrosoftSavedNotes = async (accessToken) => {
  try {
     await acquireToken();
  
    const endpoint = "https://graph.microsoft.com/v1.0/me/onenote/notebooks";

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching notes: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Notes data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};
  export { getUserMicrosoftSavedNotes };
