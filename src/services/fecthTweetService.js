const URL = "http://localhost:8000/tweets/";

export const fetchTweetService = async () => {
  try {
    const tweetS = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => data);
    console.log(tweetS);
    return tweetS;
  } catch (error) {
    console.log(error);
  }
};

fetchTweetService();
