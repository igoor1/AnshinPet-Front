import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Animal from './pages/animal/animal'
import NotFound from "./pages/notFound/notFound";

import './scss/styles.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'sweetalert2/src/sweetalert2.scss'

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/animal" element={<Animal />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}