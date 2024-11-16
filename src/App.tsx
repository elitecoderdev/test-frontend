import Header from './components/Header';
import { Toaster } from './components/ui/toaster';
import Clients from './components/Clients';
import LoanStatus from './components/LoanStatus';

function App() {
  return (
    <main>
      <Toaster />
      <Header />
      <Clients />
      <LoanStatus/>
    </main>
  );
}

export default App;
