import { createPortal } from "react-dom";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "../routes/loginFlow/WelcomePage";
import Error from "../components/Error";
import FlowOne from "../routes/loginFlow/FlowOne";
import FlowTwo from "../routes/loginFlow/FlowTwo";
import FlowThree from "../routes/loginFlow/FlowThree";
import FlowFour from "../routes/loginFlow/FlowFour";

export const ProtectedRoutes = ({ children }) => {
  if (login) {
    return children;
  } else {
    return (
      <Routes>
        <Route
          path="/"
          element={<WelcomePage />}
          errorElement={createPortal(<Error />, document.body)}
        >
          <Route
            path="/1"
            element={<FlowOne />}
            errorElement={createPortal(<Error />, document.body)}
          />
          <Route
            path="/2"
            element={<FlowTwo />}
            errorElement={createPortal(<Error />, document.body)}
          />
          <Route
            path="/3"
            element={<FlowThree />}
            errorElement={createPortal(<Error />, document.body)}
          />
          <Route
            path="/4"
            element={<FlowFour />}
            errorElement={createPortal(<Error />, document.body)}
          />
        </Route>
      </Routes>
    );
  }
};
