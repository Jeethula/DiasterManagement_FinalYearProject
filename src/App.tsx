import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardPage from './pages/DashboardPage';
import WeatherPage from './pages/WeatherPage';
import SocialPage from './pages/SocialPage';
import ResourcesPage from './pages/ResourcesPage';
import MapPage from './pages/MapPage';
import { AlertProvider } from './contexts/AlertContext';

function App() {
  return (
    <AlertProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="weather" element={<WeatherPage />} />
            <Route path="social" element={<SocialPage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="map" element={<MapPage />} />
          </Route>
        </Routes>
      </Router>
    </AlertProvider>
  );
}

export default App;