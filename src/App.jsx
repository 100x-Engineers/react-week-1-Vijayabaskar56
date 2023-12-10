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
import PropTypes from "prop-types";

function App() {
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
            <RouterProvider router={route} />
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
