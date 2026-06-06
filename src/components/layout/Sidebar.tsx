import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileSearch,
  ScanLine,
  FileCheck,
  MessageSquare,
  BarChart3,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
  Users,
} from 'lucide-react';
import { cn } from '../../utils/helpers';

const mainNavItems = [
  { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { path: '/dashboard/analyze', label: 'Job Analysis', icon: FileSearch },
  { path: '/dashboard/ocr', label: 'OCR Scanner', icon: ScanLine },
  { path: '/dashboard/resume', label: 'Resume Match', icon: FileCheck },
  { path: '/dashboard/assistant', label: 'AI Assistant', icon: MessageSquare },
  { path: '/dashboard/reports', label: 'Reports', icon: BarChart3 },
];

const bottomNavItems = [
  { path: '/dashboard/admin', label: 'Admin', icon: Users },
  { path: '/dashboard/settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const location = useLocation();

  const NavItem = ({
    path,
    label,
    icon: Icon,
  }: {
    path: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }) => {
    const isActive = location.pathname === path;

    return (
      <Link
        to={path}
        className={cn(
          'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-150',
          isActive
            ? 'bg-primary-50 text-primary-700'
            : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800'
        )}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        {!collapsed && <span>{label}</span>}
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        'flex flex-col h-screen bg-white border-r border-neutral-200 transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-neutral-200">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 bg-primary-600 rounded-lg">
            <Shield className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <span className="font-bold text-neutral-900 text-lg">JobShield</span>
          )}
        </Link>
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
        {mainNavItems.map((item) => (
          <NavItem key={item.path} {...item} />
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-neutral-200 space-y-1">
        {bottomNavItems.map((item) => (
          <NavItem key={item.path} {...item} />
        ))}
      </div>
    </aside>
  );
}
