import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/Authcontext';

function App() {
  return (
    <>
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1A1A27',
            color: '#fff',
            border: '1px solid #242438',
          },
          success: {
            iconTheme: {
              primary: '#00FF8C',
              secondary: '#1A1A27',
            },
          },
          error: {
            iconTheme: {
              primary: '#FF3E3E',
              secondary: '#1A1A27',
            },
          },
        }}
      />
      <AppRoutes />
      </AuthProvider>
    </>
  );
}
export default App