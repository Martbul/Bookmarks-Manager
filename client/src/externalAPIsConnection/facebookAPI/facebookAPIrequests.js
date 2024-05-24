async function getUserFacebookSavedCollections(accessToken) {
  const apiUrl = `https://graph.facebook.com/v20.0/me/saved?access_token=${accessToken}`;
//https://graph.facebook.com/v20.0/me/posts?fields=saved&access_token=EAAOBKbQppZBUBOz6ZBI6I2QWN1OXv5vl9qR6Xcx9j6Q66LCETPCYlNOC5oZASRhrDZAxlEYr2cth5JCNnAfsyYNGgpdgkNWuV4nuZCVXiNxZAZBKmfBjJunhLiBiRSU6vJB9hBIZC96bGiHEfqERMZCRLb3bNGxCgjX4qL8kyJvT4w7ZBzdJclsngQ5ZAIL7tHev72tUprdql2qJEDYJ2EVi6hSZCOlZB3EGZCiLqs1iaEkSgkDixgOmOMUMxDX4Nw4teV

  try {
   
    console.log(apiUrl);
      const response = await fetch(apiUrl);
      if (!response.ok) {
          throw new Error('Failed to fetch user saved collections');
      }
      const data = await response.json();
      console.log(data);
      return data;
  } catch (error) {
      console.error('Error fetching saved collections:', error);
      throw error;
  }
}

  export { getUserFacebookSavedCollections };