import { FC } from 'react'
import Logo from "../assets/logotipo_Levannta-1.png"
import LoanApplication from './LoanApplication';

interface HeaderProps {
  
}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <nav className="bg-white border-gray-200 border-b">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={Logo} className="sm:h-8 h-4" alt="Levannta Logo" />
        </a>
        <LoanApplication />
      </div>
    </nav>
  );
}

export default Header