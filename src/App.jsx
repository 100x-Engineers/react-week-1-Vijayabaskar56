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
import { useAuth, AuthProvider } from "./routes/context/Auth.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import { createPortal } from "react-dom";
import Error from "./components/Error.jsx";
import Home from "./routes/AppFlow/Home.jsx";
import Nav from "./routes/AppFlow/Nav.jsx";
import ErrorBountry from "./components/ErrorBountry.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { appUrl } from "./utils/urls.js";
import { UserProvider } from "./routes/context/UserContext.js";

function App() {
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
      console.log(error);
      setIsErrorUser(error);
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

  useEffect(() => {
    fetchUser();
  }, []);

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
            <Route path="" element={<Feed />} errorElement={<ErrorPage />} />
            <Route
              path="following"
              element={<Feed />}
              errorElement={<ErrorPage />}
            />
          </Route>
          <Route
            path=":username"
            element={<Profile users={users} />}
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
