import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Animal from './pages/animal/animal'
import Doenca from "./pages/doenca/doenca";
import Vacina from "./pages/vacina/vacina";
import CuidadoMedico from "./pages/animal/cuidadoMedico/cuidadoMedico";
import Doacao from "./pages/doacao/doacao";

import NotFound from "./pages/notFound/notFound";

import './scss/styles.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'sweetalert2/src/sweetalert2.scss'

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/animais" element={<Animal />} />
        <Route path="/animal/cuidadosMedicos/:animalId" element={<CuidadoMedico />} />
        <Route path="/doencas" element={<Doenca />} />
        <Route path="/vacinas" element={<Vacina />} />
        <Route path="/doacoes" element={<Doacao />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}