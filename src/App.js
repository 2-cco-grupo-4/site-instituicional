import Theme from "templates/Theme/Theme";
import VLibras from "@djpfs/react-vlibras"
import { UserProvider } from "contexts";
import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router-dom";

import Home from "pages/Home";
import ChooseProfileType from "pages/ChooseProfileType";
import Register from "pages/Register";
import Login from "pages/Login";
import DashAdmin from "pages/DashAdmin/DashAdmin";
import Feed from "pages/Feed";

const DefaultProviders = ({children}) => (
  <UserProvider>
    {children}
  </UserProvider>
)

function App() {
  return (
    <Theme>
      <VLibras />
      <DefaultProviders>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/persona" element={<ChooseProfileType />} />
            <Route exact path="/cadastro/:profileType" element={<Register/>} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/explorar" element={<Feed />} />
            <Route exact path="/dash-admin" element={<DashAdmin />} />
          </Routes>
        </BrowserRouter>
      </DefaultProviders>
    </Theme>
  );
}

export default App;
