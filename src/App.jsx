import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Animal from './pages/animal/animal'
import Doenca from "./pages/doenca/doenca";
import Vacina from "./pages/vacina/vacina";
import CuidadoMedico from "./pages/animal/cuidadoMedico/cuidadoMedico";
import Doacao from "./pages/doacao/doacao";
import Login from "./pages/login/login";
import Cuidador from "./pages/cuidador/cuidador";

import NotFound from "./pages/notFound/notFound";

import ProtectedRoute from "./components/protectedRoute/protectedRoute";

import './scss/styles.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'sweetalert2/src/sweetalert2.scss'

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/animais" element={<ProtectedRoute><Animal /></ProtectedRoute>} />
        <Route path="/animal/cuidadosMedicos/:animalId" element={<ProtectedRoute><CuidadoMedico /></ProtectedRoute>} />
        <Route path="/doencas" element={<ProtectedRoute><Doenca /></ProtectedRoute>} />
        <Route path="/vacinas" element={<ProtectedRoute><Vacina /></ProtectedRoute>} />
        <Route path="/doacoes" element={<ProtectedRoute><Doacao /></ProtectedRoute>} />
        <Route path="/cuidadores" element={<ProtectedRoute><Cuidador /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}