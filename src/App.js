import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import UserContextProvider from './context/AuthProvider';
import Error404 from './404';
import Dashboardindex from './pages/dashboard';


function App() {
  return (
    <UserContextProvider>
        <div className="App">
              <Router>
                <div className="routes">
                  <Routes>
                    <Route path="/" element={<Dashboardindex /> } />
                    <Route path="*" element={<Error404 />} /> 
                  </Routes>
                </div>
              </Router>
              <Toaster
                position="top-right"
                reverseOrder={false}
                gutter={8}
                containerClassName="toaster-container"
                containerStyle={{}}
                toastOptions={{
                  className: '',
                  duration: 5000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                  success: {
                    duration: 3000,
                    theme: {
                      primary: 'green',
                      secondary: 'black',
                    },
                  },
                }}
              />
        </div>
    </UserContextProvider>
  );
}

export default App;
