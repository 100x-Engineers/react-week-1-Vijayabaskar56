import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import "./index.css";
import WelcomePage from "./routes/WelcomePage.jsx";
import LoginFlowOne from "./routes/LoginFlowOne.jsx";
import LoginFlowTwo from "./routes/LoginFlowTwo.jsx";
import LoginFlowThree from "./routes/LoginFlowThree.jsx";
import LoginFlow from "./routes/LoginFlow.jsx";
import LoginFlowFour from "./routes/LoginFlowFour";
import Home from "./routes/AppFlow/Home";
import Nav from "./routes/AppFlow/Nav";
import Profile from "./routes/AppFlow/Profile";
import EditProfile from "./routes/AppFlow/EditProfile";
import PostTweet from "./routes/AppFlow/PostTweet";
import { useEffect, useState } from "react";
// import { AuthContext } from "./routes/context/AuthContext";
// import AuthProvider from "./routes/context/AuthProvider";
// import { ThemeProvider } from "./routes/context/Theme";
import {
  ThemeProvider,
  AuthProvider,
  AuthContext,
  TweetProvider,
  useTweet,
} from "./routes/context/index.js";

function App() {
  const background = location.state && location.state.background;
  const [tweets, setTweets] = useState([]);
  // const { tweet } = useTweet();

  // post Tweet
  const postTweet = (tweets) => {
    setTweets((prev) => [
      {
        id: "baskar",
        userId: "baskar",
        time: new Date().getHours(),
        ...tweets,
      },
      ...prev,
    ]);
    console.log(tweets);
  };
  // updateTweets
  const updateTweet = (id, tweetText) => {
    setTweets((prev) => [
      prev.map((prevTweet) => {
        prevTweet.id === tweetText.id ? tweets : prevTweet;
      }),
    ]);
  };
  // deleteTweets
  const deleteTweet = (id) => {
    setTweets((prev) => prev.filter((tweetText) => tweetText.id !== id));
  };

  useEffect(() => {
    const tweet = JSON.parse(localStorage.getItem("Tweets"));
    if (tweet && tweet.length > 0) {
      console.log("hii");
      setTweets(tweet);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Tweets", JSON.stringify(tweets));
  }, [tweets]);

  const [themeMode, setThemeMode] = useState("dark");
  const darkTheme = () => {
    setThemeMode("dark");
  };

  const lightTheme = () => {
    setThemeMode("light");
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("dark", "lightTheme");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  const route = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={<WelcomePage />}
          location={location || background}
        ></Route>
        <Route path="loginOne" element={<LoginFlowOne />} />
        {background && <Route path="loginOne" element={<LoginFlowOne />} />}
        <Route path="loginTwo" element={<LoginFlowTwo />} />
        <Route path="loginThree" element={<LoginFlowThree />} />
        <Route path="loginFour" element={<LoginFlowFour />} />
        <Route
          path="loginflow"
          element={<LoginFlow heading="hello" subHeading="hiii" />}
        />
        <Route path="home" element={<Nav />}>
          <Route path="foryou" element={<Home />} />
          <Route path="following" element={<Home />} />
        </Route>
        <Route path="profile" element={<Profile />}></Route>
        <Route path="editprofile" element={<EditProfile />} />
        <Route path="postTweet" element={<PostTweet />} />
      </>
    )
  );

  function TwitterApp() {
    return (
      <>
        <AuthProvider>
          <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
            <TweetProvider
              value={{ tweets, postTweet, updateTweet, deleteTweet }}
            >
              <RouterProvider router={route} />
            </TweetProvider>
          </ThemeProvider>
        </AuthProvider>
      </>
    );
  }

  return (
    <>
      <TwitterApp />
    </>
  );
}

export default App;
