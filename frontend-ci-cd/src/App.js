import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContactProvider } from './context/ContactContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import AddContact from './pages/AddContact';
import EditContact from './pages/EditContact';
import Favorites from './pages/Favorites';
import Categories from './pages/Categories';
import Statistics from './pages/Statistics';
import './styles/App.css';

function App() {
  return (
    <ContactProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/add-contact" element={<AddContact />} />
              <Route path="/edit-contact/:id" element={<EditContact />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/statistics" element={<Statistics />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ContactProvider>
  );
}

export default App;