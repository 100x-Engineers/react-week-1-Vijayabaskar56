import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import "./index.css";
import WelcomePage from "./routes/loginFlow/WelcomePage.jsx";
import axios from "axios";
import Feed from "./routes/AppFlow/Feed.jsx";
import Profile from "./routes/AppFlow/Profile";
import EditProfile from "./routes/AppFlow/EditProfile";
import PostTweet from "./routes/AppFlow/PostTweet";
import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

import { AuthProvider, TweetProvider } from "./routes/context/index.js";
import { LoginProvider } from "./routes/context/login.js";
import ErrorPage from "./routes/ErrorPage.jsx";
import { createPortal } from "react-dom";
import Error from "./components/Error.jsx";
import Home from "./routes/AppFlow/Home.jsx";
import Nav from "./routes/AppFlow/Nav.jsx";
import { fetchTweetService } from "./services/fecthTweetService.js";

function App() {
  const [tweets, setTweets] = useState([]);
  const [profileDetails, setProfileDetails] = useState([]);
  const [login, isLogin] = useState(localStorage.getItem("Token"));
  const [user, setUser] = useState(localStorage.getItem("userId"));

  // Auth Context
  const setToken = (token) => {
    isLogin(token);
  };

  // Profile Context
  const getProfileDetais = (profileDetails) => {
    setProfileDetails({
      name: profileDetails.name,
      email: profileDetails.email,
      dateOfBirth: profileDetails.dateOfBirth,
    });
    console.log(profileDetails.dateOfBirth);
  };
  const profile = profileDetails;

  // post Tweet
  const postTweet = (tweets) => {
    setTweets((prev) => [
      {
        id: tweets.id,
        userId: tweets.userId,
        time: tweets.time,
        content: tweets.content,
      },
      ...prev,
    ]);
    console.log(tweets);
  };

  // useEffect(() => {
  //   const tweetdata = fetchTweetService();
  //   postTweet(tweetdata);
  // }, [tweets]);

  // seting the context in the localstoreage and getting the context from the localstorage (later it will be replaced by the backend)

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("Profile"));
    const login = JSON.parse(localStorage.getItem("Token"));
    const user = JSON.parse(localStorage.getItem("userId"));

    if (profile && profile.length > 0) {
      console.log("hii from profile");
      setProfileDetails(profile);
    }
    if (login && login.length > 0) {
      isLogin("login");
    }
    if (user && user.length > 0) {
      setUser(user);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Profile", JSON.stringify(profileDetails));
    if (login) {
      axios.defaults.headers.common["Authorization"] = "Bearer" + login;
      axios.defaults.headers.common["userId"] = user;
      localStorage.setItem("Token", JSON.stringify(login));
      localStorage.setItem("userId", JSON.stringify(user));
    } else {
      delete axios.defaults.headers.common["Authorization"];
      delete axios.defaults.headers.common["userId"];
      localStorage.removeItem("Token");
      localStorage.removeItem("userId");
    }
  }, [profileDetails, login, user]);

  const ProtectedRoutes = ({ children }) => {
    if (login) {
      return children;
    } else {
      return <WelcomePage />;
    }
  };

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
        >
          <Route path="/" element={<Nav />} errorElement={<ErrorPage />}>
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
          />
        </Route>

        {/* <Route path="home" element={<Home />} errorElement={<ErrorPage />}>
          </Route> */}
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
        <AuthProvider value={{ login, user, setUser, setToken }}>
          <TweetProvider value={{ tweets, postTweet }}>
            <LoginProvider value={{ profile, getProfileDetais }}>
              <RouterProvider router={route} />
            </LoginProvider>
          </TweetProvider>
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

// ProtectedRoutes.propTypes = {
//   children: PropTypes.any,
// };
// TwitterApp.propTypes = {
//   children: PropTypes.any,
// };
