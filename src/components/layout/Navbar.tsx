import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  Search,
  User,
  ChevronDown,
  LogOut,
  Settings,
  HelpCircle,
  Shield,
} from 'lucide-react';
import { Button } from '../common/Button';

interface NavbarProps {
  showSearch?: boolean;
}

export function Navbar({ showSearch = true }: NavbarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-neutral-200 px-6 flex items-center justify-between">
      {showSearch ? (
        <div className="flex items-center flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search jobs, companies..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg
                placeholder:text-neutral-400 focus:bg-white focus:border-primary-500 focus:ring-2
                focus:ring-primary-500/10 focus:outline-none transition-all"
            />
          </div>
        </div>
      ) : (
        <div />
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-500 rounded-full" />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary-600" />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium text-neutral-900">John Doe</p>
              <p className="text-xs text-neutral-500">Pro Plan</p>
            </div>
            <ChevronDown className="w-4 h-4 text-neutral-400 hidden sm:block" />
          </button>

          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-neutral-200 shadow-elevated py-1 z-50">
                <div className="px-3 py-2 border-b border-neutral-100">
                  <p className="text-sm font-medium text-neutral-900">John Doe</p>
                  <p className="text-xs text-neutral-500">john@example.com</p>
                </div>
                <Link
                  to="/dashboard/settings"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                  onClick={() => setShowUserMenu(false)}
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
                <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                  <HelpCircle className="w-4 h-4" />
                  Help & Support
                </button>
                <div className="border-t border-neutral-100" />
                <Link
                  to="/"
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-danger-600 hover:bg-danger-50"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export function LandingNavbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-neutral-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 bg-primary-600 rounded-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-neutral-900 text-lg">JobShield AI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
              How It Works
            </a>
            <a href="#testimonials" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
              Testimonials
            </a>
            <a href="#faq" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/dashboard/analyze">
              <Button size="sm">
                Analyze a Job
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
