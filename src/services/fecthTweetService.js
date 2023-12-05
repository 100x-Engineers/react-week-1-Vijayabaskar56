const URL = "http://localhost:3000/feed";

export const fetchTweetService = async () => {
  try {
    const res = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const tweetS = await res.json();

    console.log(tweetS);
    return tweetS;
  } catch (error) {
    console.log(error);
  }
};

fetchTweetService();
