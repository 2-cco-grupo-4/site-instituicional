import Theme from "templates/Theme/Theme";
import VLibras from "@djpfs/react-vlibras"
import { UserProvider } from "contexts";
import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router-dom";

import Home from "pages/Home";
import ChooseProfileType from "pages/ChooseProfileType";
import Register from "pages/Register";

const DefaultProviders = ({children}) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <UserProvider>
      {children}
    </UserProvider>
  </LocalizationProvider>
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
          </Routes>
        </BrowserRouter>
      </DefaultProviders>
    </Theme>
  );
}

export default App;
