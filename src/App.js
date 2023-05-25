import Theme from "templates/Theme/Theme";
import { UserProvider } from "contexts";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "pages/Home";
import ChooseProfileType from "pages/ChooseProfileType";
import { Routes } from "react-router-dom";

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
            <Route exact path="/personas" element={<ChooseProfileType />} />
          </Routes>
        </BrowserRouter>
      </DefaultProviders>
    </Theme>
  );
}

export default App;
