import React from 'react';
import { Link } from 'react-router-dom';
import { NavItem } from './NavItems';

interface DesktopNavProps {
  navItems: NavItem[];
  isActive: (path: string) => boolean;
}

const DesktopNavComponent = ({ navItems, isActive }: DesktopNavProps) => {
  return (
    <nav className="hidden md:ml-6 md:flex md:space-x-8">
      {navItems
        .filter(item => !item.isButton)
        .map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
              isActive(item.path)
                ? 'border-indigo-500 text-gray-900 dark:text-white'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'
            }`}
          >
            <span className="mr-2" aria-hidden="true">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      
      {navItems
        .filter(item => item.isButton)
        .map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md ml-4"
          >
            <span className="mr-1" aria-hidden="true">{item.icon}</span>
            {item.label}
          </Link>
        ))}
    </nav>
  );
};

const DesktopNav = React.memo(DesktopNavComponent);
DesktopNav.displayName = 'DesktopNav';

export { DesktopNav };
