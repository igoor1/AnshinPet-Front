import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Animal from './pages/animal';
import CreateAnimal from "./pages/createAnimal";
import Dashboard from "./pages/dashboard";
import Doenca from "./pages/doenca/doenca";
import AnimalCuidadosMedicos from "./pages/animalCuidadosMedicos";

import 'primereact/resources/themes/lara-light-indigo/theme.css';  // Tema
import 'primereact/resources/primereact.min.css';           // PrimeReact
import 'primeicons/primeicons.css';                         // Icons
import 'primeflex/primeflex.css';                           //PrimeFlex


export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/animal" element={<Animal />} />
        <Route path="/animal/:idAnimal" element={<AnimalCuidadosMedicos />} />
        <Route path="/createAnimal" element={<CreateAnimal />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doenca" element={<Doenca />} />
      </Routes>
    </Router>
  )
}
