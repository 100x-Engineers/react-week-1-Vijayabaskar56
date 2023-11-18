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

import Feed from "./routes/AppFlow/Feed.jsx";
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
  useAuth,
} from "./routes/context/index.js";
import { LoginProvider } from "./routes/context/login.js";
import ErrorPage from "./routes/Error404.jsx";
import { createPortal } from "react-dom";
import Error from "./components/Error.jsx";
import Home from "./routes/AppFlow/Home.jsx";

function App() {
  const [tweets, setTweets] = useState([]);
  const [profileDetails, setProfileDetails] = useState([]);
  const [login, isLogin] = useState(null);
  // const { token } = useAuth();
  // Auth Context
  const setToken = (token) => {
    isLogin(token);
    console.log(token, "from setToken");
  };

  const ProtectedRoutes = ({ children }) => {
    if (login) {
      return children;
    } else {
      return <WelcomePage />;
    }
  };

  // Profile Context
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
    const login = JSON.parse(localStorage.getItem("Flow"));
    if (tweet && tweet.length > 0) {
      console.log("hii");
      setTweets(tweet);
    }
    if (profile && profile.length > 0) {
      console.log("hii from profile");
      setProfileDetails(profile);
    }
    if (login && login.length > 0) {
      isLogin("login");
      console.log(login, "from local storage");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Tweets", JSON.stringify(tweets));
    localStorage.setItem("Profile", JSON.stringify(profileDetails));
    localStorage.setItem("Flow", JSON.stringify(login));
  }, [tweets, profileDetails, login]);

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
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
          errorElement={createPortal(<Error />, document.body)}
        ></Route>

        <Route path="home" element={<Home />} errorElement={<ErrorPage />}>
          <Route
            path="foryou"
            element={<Feed />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="following"
            element={<Feed />}
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
        <AuthProvider value={{ login, setToken }}>
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
