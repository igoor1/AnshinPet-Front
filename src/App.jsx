import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Animal from './pages/animal/animal'
import Doenca from "./pages/doenca/doenca";
import Vacina from "./pages/vacina/vacina";

import NotFound from "./pages/notFound/notFound";

import './scss/styles.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'sweetalert2/src/sweetalert2.scss'

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/animais" element={<Animal />} />
        <Route path="/doencas" element={<Doenca />} />
        <Route path="/vacinas" element={<Vacina />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}