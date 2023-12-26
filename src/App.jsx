import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import WelcomePage from "./routes/loginFlow/WelcomePage.jsx";
import Feed from "./routes/AppFlow/Feed.jsx";
import Profile from "./routes/AppFlow/Profile";
import EditProfile from "./routes/AppFlow/EditProfile";
import PostTweet from "./routes/AppFlow/PostTweet";
import { useAuth, AuthProvider } from "./routes/context/Auth.js";
import ErrorPage from "./routes/ErrorPage.jsx";
import { createPortal } from "react-dom";
import Error from "./components/Error.jsx";
import Home from "./routes/AppFlow/Home.jsx";
import Nav from "./routes/AppFlow/Nav.jsx";
import ErrorBountry from "./components/ErrorBountry.jsx";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { UserProvider } from "./routes/context/UserContext.js";
import { loader as usersLoader } from "./routes/context/useGetUser.js";
import { loader as tweetLoader } from "./routes/context/tweetloader.js";
import { loader as userTweetLoader } from "./routes/context/userTweetloader.js";
import PostTweetModal from "./routes/AppFlow/componenets/PostTweetModal.jsx";

function App() {
  const [token, setingToken] = useState(localStorage.getItem("Token"));
  // Function to set the authentication token
  const setToken = (newToken) => {
    setingToken(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("Token", token);
    }
  }, [token]);

  const [users, setUser] = useState();
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isErrorUser, setIsErrorUser] = useState("");

  const fetchUser = async () => {
    setIsLoadingUser(true);
    try {
      const response = await axios.get(`${appUrl}/users`);
      if (response && response.status >= 200 && response.status < 300) {
        const { user } = response.data;
        setUser(user);
        setIsLoadingUser(false);
      } else {
        setIsErrorUser(response.message);
      }
    } catch (error) {
      // setIsErrorUser("Error Fecting User Data");
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  const appUrl = import.meta.env.VITE_APP_API_URL;
  const loader = async () => {
    const response = await axios.get(`${appUrl}/users`);
    if (response && response.status >= 200 && response.status < 300) {
      const { user } = response.data;
      return user;
    } else {
      const { message } = response;
      return message;
    }
  };

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
          // loader={loader}
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
          errorElement={createPortal(<Error />, document.body)}
        >
          <Route path="/" element={<Nav />} errorElement={<ErrorPage />}>
            <Route
              path=""
              element={<Feed />}
              loader={tweetLoader}
              errorElement={<ErrorPage />}
            />
            <Route
              path="following"
              loader={tweetLoader}
              element={<Feed />}
              errorElement={<ErrorPage />}
            />
          </Route>
          <Route
            path=":id"
            loader={usersLoader}
            element={<Profile />}
            errorElement={<ErrorPage />}
          >
            <Route
              path=""
              loader={userTweetLoader}
              element={<Feed />}
              errorElement={<ErrorPage />}
            ></Route>
          </Route>
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
          <Route
            path="posting"
            element={<PostTweetModal />}
            errorElement={<ErrorPage />}
          />
        </Route>

        {/* <Route path="home" element={<Home />} errorElement={<ErrorPage />}>
          </Route> */}
      </>
    )
  );

  function TwitterApp() {
    return (
      <>
        <ErrorBountry fallback={<Error />}>
          <AuthProvider value={{ token, setToken }}>
            <UserProvider
              value={{
                users,
                isLoadingUser,
                isErrorUser,
                setUser,
                setIsErrorUser,
                setIsLoadingUser,
              }}
            >
              <RouterProvider router={route} />
            </UserProvider>
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
