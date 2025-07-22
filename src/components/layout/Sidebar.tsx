import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  label: string;
  path: string;
  icon: string;
  badge?: number;
}

interface SidebarProps {
  onClose?: () => void;
}

const navItems: NavItem[] = [
  { label: 'Start', path: '/', icon: '🏠' },
  { label: 'Inspection Jobs', path: '/jobs', icon: '📋' },
  { label: 'Submit New Job', path: '/new-job', icon: '➕' },
  { label: 'Inbox', path: '/inbox', icon: '📧', badge: 1 },
  { label: 'Reports', path: '/reports', icon: '📊' },
  { label: 'Settings', path: '/settings', icon: '⚙️' },
  { label: 'Sign out', path: '/logout', icon: '🚪' },
];

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation();

  const handleNavClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="w-64 lg:w-72 bg-white text-gray-800 h-screen flex flex-col shadow-soft border-r border-gray-100">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center shadow-soft">
            <span className="text-white font-bold text-lg">BDAE</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">BDAE</h1>
            <p className="text-xs text-gray-500">Mit Sicherheit ins Ausland!</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={handleNavClick}
                  className={`sidebar-item ${
                    isActive ? 'sidebar-item-active' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <div className="text-xs text-gray-500 space-y-1">
          <div>Imprint</div>
          <div>Privacy</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 