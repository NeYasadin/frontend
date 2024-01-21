import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import LandingPage from "./pages/landing";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import CompanyAgentPage from "./pages/company-agent-page";
import { QueryClientProvider } from "react-query";
import queryClient from "./utils/queryClient";
import CompanyAgentDetails from "./pages/company-agent-details";
import CompanyAgentUpdate from "./pages/company-agent-update";
import CreateCompany from "./pages/create-company";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route path={"/company-agent/create-company/:id"}>
            <CreateCompany />
          </Route>
          <Route path="/company-agent/update/:id">
            <CompanyAgentUpdate />
          </Route>
          <Route path="/company-agent/details/:id">
            <CompanyAgentDetails />
          </Route>
          <Route path="/company-agent/:id">
            <CompanyAgentPage />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
