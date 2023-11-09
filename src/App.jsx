import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import "./index.css";
import WelcomePage from "./routes/loginFlow/WelcomePage.jsx";
import LoginFlowOne from "./routes/loginFlow/LoginFlowOne.jsx";
import LoginFlowTwo from "./routes/loginFlow/LoginFlowTwo.jsx";
import LoginFlowThree from "./routes/loginFlow/LoginFlowThree.jsx";
import LoginFlowFour from "./routes/loginFlow/LoginFlowFour";
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
import { LoginProvider } from "./routes/context/login.js";
import ErrorPage from "./routes/Error404.jsx";
import { createPortal } from "react-dom";
import Error from "./components/Error.jsx";

function App() {
  const [tweets, setTweets] = useState([]);
  const [profileDetails, setProfileDetails] = useState([]);

  const getProfileDetais = ([profileDetails]) => {
    setProfileDetails([
      {
        name: profileDetails.name,
        email: profileDetails.email,
        dateOfBirth: profileDetails.dateOfBirth,
      },
    ]);
    console.log(profileDetails.dateOfBirth);
  };
  const profile = profileDetails;

  // post Tweet
  const postTweet = (tweets) => {
    setTweets((prev) => [
      {
        id: "Vijayabaskar",
        userId: "vjbass",
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
    const profile = JSON.parse(localStorage.getItem("Profile"));
    const Flow = JSON.parse(localStorage.getItem("Flow"));
    if (tweet && tweet.length > 0) {
      console.log("hii");
      setTweets(tweet);
    }
    if (profile && profile.length > 0) {
      console.log("hii from profile");
      setProfileDetails(profile);
    }
    console.log(Flow, "from local storage");
  }, []);

  useEffect(() => {
    localStorage.setItem("Tweets", JSON.stringify(tweets));
    localStorage.setItem("Profile", JSON.stringify(profileDetails));
  }, [tweets, profileDetails]);

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
          errorElement={createPortal(<Error />, document.body)}
        ></Route>
        <Route
          path="loginOne"
          element={<LoginFlowOne />}
          errorElement={<ErrorPage />}
        />
        {/* {background && <Route path="loginOne" element={<LoginFlowOne />} />} */}
        <Route
          path="loginTwo"
          element={<LoginFlowTwo />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="loginThree"
          element={<LoginFlowThree />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="loginFour"
          element={<LoginFlowFour />}
          errorElement={<ErrorPage />}
        />

        <Route path="home" element={<Nav />} errorElement={<ErrorPage />}>
          <Route
            path="foryou"
            element={<Home />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="following"
            element={<Home />}
            errorElement={<ErrorPage />}
          />
        </Route>
        <Route
          path="profile"
          element={<Profile />}
          errorElement={<ErrorPage />}
        ></Route>
        <Route
          path="editprofile"
          element={<EditProfile />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="postTweet"
          element={<PostTweet />}
          errorElement={<ErrorPage />}
        />
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
              <LoginProvider value={{ profile, getProfileDetais }}>
                <RouterProvider router={route} />
              </LoginProvider>
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
