import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
import ComingSoonSection from './components/ComingSoonSection';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import MediaShowcase from './pages/MediaShowcase';

// Homepage component that contains all main sections
const HomePage = () => (
  <>
    <Hero />
    <ProjectsSection />
    <ComingSoonSection />
  </>
);

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/media" element={<MediaShowcase />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
