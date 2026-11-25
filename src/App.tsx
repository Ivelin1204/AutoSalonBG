import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ChatWidget } from './components/chat/ChatWidget';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { ScrollToTop } from './components/layout/ScrollToTop';
import AboutPage from './pages/AboutPage/AboutPage';
import BookingPage from './pages/BookingPage/BookingPage';
import ContactPage from './pages/ContactPage/ContactPage';
import GalleryPage from './pages/GalleryPage/GalleryPage';
import HomePage from './pages/HomePage/HomePage';

// HashRouter (адреси като #/gallery) — работи на GitHub Pages и при отваряне на файла директно.
export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <ChatWidget />
    </HashRouter>
  );
}
