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
import CompanyCreate from "./pages/company-create";
import CustomerPage from "./pages/customer-page";
import CustomerDetails from "./pages/customer-details";
import CustomerUpdate from "./pages/customer-update";
import CustomerComplaintCreation from "./pages/create-complaint-page";
import MyComplaints from "./pages/myComplaints-page";
import TopFiveCustomer from "./pages/top-five-customer";
import CompanyUpdate from "./pages/company-update";
import CompanyInfo from "./pages/company-info";
import SubscriptionCreate from "./pages/subscription-create";
import Subscriptions from "./pages/subscriptions";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route path={"/company-agent/company-subscriptions/:id"}>
            <Subscriptions />
          </Route>
          <Route path={"/company-agent/create-subscription/:id"}>
            <SubscriptionCreate />
          </Route>
          <Route path={"/company-agent/update-company/:id"}>
            <CompanyUpdate />
          </Route>
          <Route path={"/company-agent/create-company/:id"}>
            <CompanyCreate />
          </Route>
          <Route path="/company-agent/update/:id">
            <CompanyAgentUpdate />
          </Route>
          <Route path="/company-agent/details/:id">
            <CompanyAgentDetails />
          </Route>
          <Route path="/company-agent/company-details/:id">
            <CompanyInfo />
          </Route>
          <Route path="/company-agent/:id">
            <CompanyAgentPage />
          </Route>
          <Route path="/customer/:id">
            <CustomerPage />
          </Route>
          <Route path="/customer-info/top-5-customer/:id">
            <TopFiveCustomer />
          </Route>
          <Route path="/customer-info/detail/:id">
            <CustomerDetails />
          </Route>
          <Route path="/customer-info/update/:id">
            <CustomerUpdate />
          </Route>
          <Route path="/customer-complaint/creation/:id">
            <CustomerComplaintCreation />
          </Route>
          <Route path="/customer-info/mycomplaints/:id">
            <MyComplaints />
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
