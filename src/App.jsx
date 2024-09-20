import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import { Animal } from './pages/animal/animal'
import { CreateAnimal } from './pages/animal/createAnimal'


import 'primereact/resources/themes/lara-light-indigo/theme.css';  // Tema
import 'primereact/resources/primereact.min.css';           // PrimeReact
import 'primeicons/primeicons.css';                         // Icons
import 'primeflex/primeflex.css';                           //PrimeFlex


export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/animal" element={<Animal />} />
        <Route path="/animal/create" element={<CreateAnimal />} />
      </Routes>
    </Router>
  )
}
