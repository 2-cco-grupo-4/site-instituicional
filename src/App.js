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
import PhotographerPreferences from "pages/PhotographerPreferences";
import PreferencesRegister from "pages/PreferencesRegister";

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
            <Route exact path="/preferencias-fotografo" element={<PhotographerPreferences />}></Route>
            <Route exact path="/preferencias-cadastro" element={<PreferencesRegister />}></Route>
          </Routes>
        </BrowserRouter>
      </DefaultProviders>
    </Theme>
  );
}

export default App;
