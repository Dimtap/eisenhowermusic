import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContentProvider } from './context/ContentContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Schedule from './components/Schedule';
import BandSections from './components/BandSections';
import Media from './components/Media';
import Contact from './components/Contact';
import AdminPage from './components/admin/AdminPage';

function MainSite() {
  return (
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
  );
}

function App() {
  return (
    <BrowserRouter>
      <ContentProvider>
        <Routes>
          <Route path="/" element={<MainSite />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </ContentProvider>
    </BrowserRouter>
  );
}

export default App;
