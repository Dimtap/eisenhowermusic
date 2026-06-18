import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Schedule from './components/Schedule';
import BandSections from './components/BandSections';
import Media from './components/Media';
import Contact from './components/Contact';

function App() {
  return (
    <BrowserRouter>
      <div className="App font-body bg-[#FDFDFD]">
        <Navigation />
        <main>
          <Hero />
          <About />
          <Schedule />
          <BandSections />
          <Media />
          <Contact />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
