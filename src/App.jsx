import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import SnackDetail from './pages/SnackDetail';
import AddSnack from './pages/AddSnack';
import Profile from './pages/Profile';
import Welcome from './pages/Welcome';
import './App.css';

function App() {
  const [hasUser, setHasUser] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkUserData = () => {
    const userData = localStorage.getItem('snackifyUser');
    setHasUser(!!userData);
  };

  useEffect(() => {
    // Check if user data exists in localStorage
    checkUserData();
    setLoading(false);

    // Listen for storage changes (when user completes onboarding)
    window.addEventListener('storage', checkUserData);

    // Custom event for same-window updates
    window.addEventListener('userDataUpdated', checkUserData);

    return () => {
      window.removeEventListener('storage', checkUserData);
      window.removeEventListener('userDataUpdated', checkUserData);
    };
  }, []);

  if (loading) {
    return <div className="app">Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        {!hasUser ? (
          <Routes>
            <Route path="/welcome" element={<Welcome onComplete={checkUserData} />} />
            <Route path="*" element={<Navigate to="/welcome" replace />} />
          </Routes>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/snack/:id" element={<SnackDetail />} />
              <Route path="/add-snack" element={<AddSnack />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/welcome" element={<Navigate to="/" replace />} />
            </Routes>
            <Navbar />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
