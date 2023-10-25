import Theme from "templates/Theme/Theme"
import VLibras from "@djpfs/react-vlibras"
import { UserProvider } from "contexts"
import { BrowserRouter, Route } from "react-router-dom"
import { Routes } from "react-router-dom"
import Pedido from "pages/Pedido"
import Home from "pages/Home"
import ChooseProfileType from "pages/ChooseProfileType"
import Register from "pages/Register"
import Login from "pages/Login"
import DashAdmin from "pages/DashAdmin/DashAdmin"
import DashFotografo from "pages/DashFotografo"
import Feed from "pages/Feed"
import Preferences from "pages/Preferences"
import Album from "pages/Album"
import PerfilFotografo from "pages/PerfilFotografo/PerfilFotografo"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import InstaRedirect from "pages/InstaRedirect"
import CadastroAlbum from "pages/CadastroAlbum"

import Chat from "pages/Chat";
import ArquivosAdmin from "pages/ArquivosAdmin";
import ArquivosFotografo from "pages/ArquivosFotografo";
import ListarFotografoTeste from "pages/ListarFotografoTeste";

const DefaultProviders = ({ children }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <UserProvider>{children}</UserProvider>
  </LocalizationProvider>
)

function App() {
  return (
    <Theme>
      <VLibras />
      <DefaultProviders>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/pedido" element={<Pedido />} />
            <Route exact path="/persona" element={<ChooseProfileType />} />
            <Route exact path="/cadastro/:profileType" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/explorar" element={<Feed />} />
            <Route exact path="/dash-admin" element={<DashAdmin />} />
            <Route exact path="/dash-fotografo" element={<DashFotografo />} />
            <Route exact path="/preferencias" element={<Preferences />} />
            <Route exact path="/album/:idAlbum" element={<Album />} />
            <Route exact path="/chat" element={<Chat />}></Route>
            <Route
              exact
              path="/teste-listar"
              element={<ListarFotografoTeste />}
            />
            <Route
              exact
              path="/cadastro-album"
              element={<CadastroAlbum />}
            ></Route>
            <Route
              exact
              path="/insta-redirect/"
              element={<InstaRedirect />}
            ></Route>
            <Route
              exact
              path="/perfil-fotografo"
              element={<PerfilFotografo />}
            ></Route>
            <Route
              exact
              path="/dash-admin/arquivos"
              element={<ArquivosAdmin />}
            ></Route>
            <Route
              exact
              path="/dash-fotografo/arquivos"
              element={<ArquivosFotografo />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </DefaultProviders>
    </Theme>
  )
}

export default App
