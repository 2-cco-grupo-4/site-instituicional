import Theme from "templates/Theme/Theme";
import { UserProvider } from "contexts";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "pages/Home";
import ChooseProfileType from "pages/ChooseProfileType";
import { Routes } from "react-router-dom";
import DashAdmin from "pages/DashAdmin/DashAdmin";

const DefaultProviders = ({children}) => (
  <UserProvider>
    {children}
  </UserProvider>
)

function App() {
  return (
    <Theme>
      <DefaultProviders>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/persona" element={<ChooseProfileType />} />
            <Route exact path="/dash-admin" element={<DashAdmin />} />
          </Routes>
        </BrowserRouter>
      </DefaultProviders>
    </Theme>
  );
}

export default App;
