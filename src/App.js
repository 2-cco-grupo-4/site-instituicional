import Theme from "templates/Theme/Theme";
// import Home from "pages/Home" 
import ChooseProfileType from "pages/ChooseProfileType";
import { UserProvider } from "contexts";

const DefaultProviders = ({children}) => (
  <UserProvider>
    {children}
  </UserProvider>
)

function App() {
  return (
    <Theme>
      <DefaultProviders>
        <ChooseProfileType />
      </DefaultProviders>
    </Theme>
  );
}

export default App;
