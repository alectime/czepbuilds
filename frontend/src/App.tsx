import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import MediaShowcase from './pages/MediaShowcase';
import SporeLink from './pages/SporeLink';
import CEABuilds from './pages/CEABuilds';
import VPDCalculatorPage from './components/VPDCalculatorPage';
import HoyaDesigns from './pages/HoyaDesigns';
import ParallaxHomePage from './components/ParallaxHomePage';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<ParallaxHomePage />} />
            <Route path="/media" element={<MediaShowcase />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/projects/spore-link" element={<SporeLink />} />
            <Route path="/projects/cea-builds" element={<CEABuilds />} />
            <Route path="/projects/vpd-calculator" element={<VPDCalculatorPage />} />
            <Route path="/projects/hoya-designs" element={<HoyaDesigns />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
