import AppRoutes from './AppRoutes';
import { AuthProvider } from './context/auth';
import { TaskProvider } from './context/task';

export default function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <AppRoutes/>
      </TaskProvider>      
    </AuthProvider>
  );
}
