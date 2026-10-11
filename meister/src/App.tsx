import { Route, Routes } from 'react-router-dom';
import { DirectionSwitcher } from './components/DirectionSwitcher';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { DirectionProvider } from './lib/direction';
import { SmoothScroll } from './lib/SmoothScroll';
import { useDocumentMeta } from './lib/useDocumentMeta';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import InsightDetail from './pages/InsightDetail';
import Insights from './pages/Insights';
import NotFound from './pages/NotFound';
import Privacy from './pages/Privacy';
import Services from './pages/Services';
import Work from './pages/Work';
import WorkDetail from './pages/WorkDetail';

const showSwitcher = import.meta.env.VITE_SHOW_DIRECTION_SWITCHER !== 'false';

export default function App() {
  useDocumentMeta();
  return (
    <DirectionProvider>
      <a className="skip-link" href="#main">
        본문 바로가기
      </a>
      <SmoothScroll />
      <Header />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<WorkDetail />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<InsightDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      {showSwitcher && <DirectionSwitcher />}
    </DirectionProvider>
  );
}
