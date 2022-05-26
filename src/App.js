import RulesState from "./context/rules/RulesState";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import HeadingList from "./HeadingList";

const App = () => {
  return (
    <Router>
      <RulesState>
        <div>
          <NavBar />
          <Switch>
            {/* <Route path="/heading">
              <Headings />
            </Route>
            <Route path="/subheading">
              <SubHeadings />
            </Route> */}
            <Route exact path="/">
              <HeadingList />
            </Route>
          </Switch>
        </div>
      </RulesState>
    </Router>
  );
};

export default App;
