import React, { useCallback } from 'react';
import { X } from 'lucide-react';
import { NavItem } from './NavItems';

interface MobileMenuProps {
  isOpen: boolean;
  navItems: NavItem[];
  isActive: (path: string) => boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

const MobileMenu = React.memo(({
  isOpen,
  navItems,
  isActive,
  onClose,
  onNavigate
}: MobileMenuProps) => {
  const handleKeyDown = useCallback((e: React.KeyboardEvent, path: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onNavigate(path);
      onClose();
    }
  }, [onNavigate, onClose]);

  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="pt-2 pb-3 space-y-1">
        <div className="px-3 py-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-600 dark:text-gray-300"
          >
            <span className="sr-only">Close menu</span>
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {navItems.map((item) => {
          const isActiveItem = isActive(item.path);
          return (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => {
                onNavigate(item.path);
                onClose();
              }}
              onKeyDown={(e) => handleKeyDown(e, item.path)}
              className={`block w-full text-left px-3 py-2 text-base font-medium ${
                isActiveItem
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700 dark:bg-gray-700 dark:text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
              } border-l-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              aria-current={isActiveItem ? 'page' : undefined}
            >
              <div className="flex items-center">
                <span className="mr-3" aria-hidden="true">
                  {item.icon}
                </span>
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

MobileMenu.displayName = 'MobileMenu';

export default MobileMenu;
