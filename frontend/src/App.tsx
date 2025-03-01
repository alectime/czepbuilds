import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
import ComingSoonSection from './components/ComingSoonSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <ProjectsSection />
        <ComingSoonSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
