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
import { useAuth, AuthProvider } from "./routes/context/Auth.jsx";
import { TweetProvider } from "./routes/context/index.js";
import { LoginProvider } from "./routes/context/login.js";
import ErrorPage from "./routes/ErrorPage.jsx";
import { createPortal } from "react-dom";
import Error from "./components/Error.jsx";
import Home from "./routes/AppFlow/Home.jsx";
import Nav from "./routes/AppFlow/Nav.jsx";
import { fetchTweetService } from "./services/fecthTweetService.js";
import ErrorBountry from "./components/ErrorBountry.jsx";
import { DataContextProvider } from "./routes/context/useFetchDataContext.jsx";

function App() {
  const [tweets, setTweets] = useState([]);
  const [profileDetails, setProfileDetails] = useState([]);
  const [token, settoken] = useState(localStorage.getItem("Token"));

  // Auth Context
  const setToken = (token) => {
    settoken(token);
  };

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

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
  const postTweet = (tweet) => {
    const {
      data: { tweets },
    } = tweet;

    const [tweetobj] = tweets;
    setTweets(tweetobj);
  };

  // useEffect(() => {
  //   fetchTweetService()
  //     .then((data) => {
  //       postTweet(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // seting the context in the localstoreage and getting the context from the localstorage (later it will be replaced by the backend)

  // useEffect(() => {
  //   const profile = JSON.parse(localStorage.getItem("Profile"));
  //   const login = JSON.parse(localStorage.getItem("Token"));
  //   const user = JSON.parse(localStorage.getItem("userId"));

  //   if (profile && profile.length > 0) {
  //     console.log("hii from profile");
  //     setProfileDetails(profile);
  //   }
  //   if (login && login.length > 0) {
  //     settoken("login");
  //   }
  //   if (user && user.length > 0) {
  //     setUser(user);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("Profile", JSON.stringify(profileDetails));
  //   if (token) {
  //     axios.defaults.headers.common["Authorization"] = "Bearer" + token;
  //     axios.defaults.headers.common["userId"] = user;
  //     localStorage.setItem("Token", JSON.stringify(token));
  //     localStorage.setItem("userId", JSON.stringify(user));
  //     0;
  //   } else {
  //     delete axios.defaults.headers.common["Authorization"];
  //     delete axios.defaults.headers.common["userId"];
  //     localStorage.removeItem("Token");
  //     localStorage.removeItem("userId");
  //   }
  // }, [profileDetails, token, user]);

  const ProtectedRoutes = ({ children }) => {
    const { token } = useAuth();
    if (!token) {
      return <WelcomePage />;
    } else {
      return children;
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
        <ErrorBountry fallback={<Error />}>
          <AuthProvider>
            <DataContextProvider>
              <TweetProvider value={{ tweets, postTweet }}>
                <LoginProvider value={{ profile, getProfileDetais }}>
                  <RouterProvider router={route} />
                </LoginProvider>
              </TweetProvider>
            </DataContextProvider>
          </AuthProvider>
        </ErrorBountry>
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
