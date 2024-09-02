import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import authService from './appwrite/auth';
import { Footer, Header } from "./components";
import { login, logout } from "./store/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [dispatch]);

  if (loading) {
    return <div className='min-h-screen flex items-center justify-center'>Loading...</div>;
  }

  return (
    <div className='min-h-screen flex flex-col bg-gray-400'>
      <Header />
      <main className='flex-grow'>
        {/* <Outlet /> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
