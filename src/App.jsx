import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import { Animal } from './pages/animal/animal'
import { CreateAnimal } from './pages/animal/createAnimal'
import { Medicals } from "./pages/animal/medicals"
import { Dashboard } from "./pages/dashboard/dashboard"

import { Doenca } from './pages/doenca/doenca'
import { Vacina } from './pages/vacina/vacina'

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
        <Route path="/animal/medicals/:animalId" element={<Medicals />} />
        <Route path="/doenca" element={<Doenca />} />
        <Route path="/vacina" element={<Vacina />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}
