import { MainContextProvider } from './context/main';

import './App.css'
import Router from './routes/sections';

function App() {

  return (
    <MainContextProvider>

      <Router/>

    </MainContextProvider>
  )
}

export default App
