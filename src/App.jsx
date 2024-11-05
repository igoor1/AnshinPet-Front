import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Animal from './pages/animal/animal'
import Doenca from "./pages/doenca/doenca";
import Vacina from "./pages/vacina/vacina";
import Detalhes from "./pages/animal/detalhes/detalhes";
import Doacao from "./pages/doacao/doacao";
import Login from "./pages/login/login";
import Cuidador from "./pages/cuidador/cuidador";
import Dashboard from "./pages/dashboard/dashboard";
import Adocao from "./pages/adocao/adocao";
import AdocaoDetalhes from "./pages/adocao/detalhes/adocaoDetalhes";

import NotFound from "./pages/notFound/notFound";

import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import Auth from "./components/auth/auth";

import './scss/styles.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'sweetalert2/src/sweetalert2.scss';
import Home from "./pages/home/home";

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/admin/animais" element={<ProtectedRoute><Animal /></ProtectedRoute>} />
        <Route path="/admin/animais/detalhes/:animalId" element={<ProtectedRoute><Detalhes /></ProtectedRoute>} />
        <Route path="/admin/doencas" element={<ProtectedRoute><Doenca /></ProtectedRoute>} />
        <Route path="/admin/vacinas" element={<ProtectedRoute><Vacina /></ProtectedRoute>} />
        <Route path="/admin/doacoes" element={<ProtectedRoute><Doacao /></ProtectedRoute>} />
        <Route path="/admin/cuidadores" element={<ProtectedRoute><Cuidador /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Auth><Login /></Auth>} />
        <Route path="/" element={<Home />} />
        <Route path="/adocao" element={<Adocao />} />
        <Route path="/adocao/detalhes/:animalId" element={<AdocaoDetalhes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}