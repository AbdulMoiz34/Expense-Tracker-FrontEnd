import { BrowserRouter } from "react-router-dom";
import AppRouter from "./config/AppRouter";
import { Header } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  )
}

export default App;