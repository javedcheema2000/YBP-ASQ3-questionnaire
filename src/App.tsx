import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PatientForm } from './PatientForm';
import { Admin } from './Admin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PatientForm />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
