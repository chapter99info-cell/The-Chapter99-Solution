import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import JimmyAI from './components/JimmyAI';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/portfolio" element={<div className="p-10 text-center">Portfolio Page (Coming Soon)</div>} />
      </Routes>
      <JimmyAI />
    </Router>
  );
}
