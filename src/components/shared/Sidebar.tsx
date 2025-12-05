'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, ChevronRight, X, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navigationConfig } from '@/lib/navigation.config';
import Logo from './Logo';
import { logoutUser } from '@/services/auth/logoutUser';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: string;
}

export default function Sidebar({ isOpen, onClose, userRole }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navItems = navigationConfig[userRole!] || navigationConfig['TRAINER'];

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logoutUser();
    } catch (error) {
      console.error('Logout failed:', error);
      router.push('/signin');
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Auto-expand parent items if their children are active
  useEffect(() => {
    const activeParents: string[] = [];
    navItems.forEach((item: any) => {
      if (item.children) {
        const hasActiveChild = item.children.some((child: any) =>
          pathname === child.href || pathname.startsWith(child.href + '/')
        );
        if (hasActiveChild) {
          activeParents.push(item.label);
        }
      }
    });
    setExpandedItems(activeParents);
  }, [pathname, navItems]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href: string) => {
    if (!href) return false;
    return pathname === href || pathname.startsWith(href + '/');
  };

  const isParentActive = (item: any) => {
    if (item.href && isActive(item.href)) return true;
    if (item.children) {
      return item.children.some((child: any) => isActive(child.href));
    }
    return false;
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-screen w-64 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 shadow-2xl transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-800/50 bg-gradient-to-r from-red-600/10 to-transparent">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation - Scrollable Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent" style={{ maxHeight: 'calc(100vh - 180px)' }}>
            {navItems.map((item) => (
              <NavItem
                key={item.label}
                item={item}
                isActive={isActive}
                isParentActive={isParentActive}
                expandedItems={expandedItems}
                toggleExpand={toggleExpand}
              />
            ))}
          </nav>
        </div>

        {/* Sidebar Footer with Logout */}
        <div className="p-4 border-t border-gray-800/50 space-y-3">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-all duration-200 shadow-lg shadow-red-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOut className="w-5 h-5" />
            <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
          </button>
          <div className="text-xs text-gray-500 text-center font-medium">
            <span className="text-red-500">Gym</span>Flow v1.0
          </div>
        </div>
      </aside>
    </>
  );
}

// Nav Item Component
function NavItem({
  item,
  isActive,
  isParentActive,
  expandedItems,
  toggleExpand,
}: any) {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedItems.includes(item.label);
  const active = isParentActive(item);

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => toggleExpand(item.label)}
          className={cn(
            'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group',
            active
              ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-600/30'
              : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
          )}
        >
          <div className="flex items-center gap-3">
            <item.icon className={cn(
              'w-5 h-5 transition-transform duration-200',
              active ? 'scale-110' : 'group-hover:scale-110'
            )} />
            <span>{item.label}</span>
            {item.badge && (
              <span className="px-2 py-0.5 text-xs font-semibold bg-red-500/20 text-red-400 rounded-full">
                {item.badge}
              </span>
            )}
          </div>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 transition-transform duration-200" />
          ) : (
            <ChevronRight className="w-4 h-4 transition-transform duration-200" />
          )}
        </button>

        {isExpanded && (
          <div className="ml-3 mt-1 space-y-1 border-l-2 border-gray-800 pl-3">
            {item.children.map((child: any) => (
              <Link
                key={child.label}
                href={child.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 group relative',
                  isActive(child.href)
                    ? 'bg-red-600/20 text-red-400 font-medium border-l-2 border-red-500 -ml-[2px]'
                    : 'text-gray-400 hover:bg-gray-800/30 hover:text-gray-200'
                )}
              >
                {isActive(child.href) && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-500 rounded-r"></span>
                )}
                <child.icon className={cn(
                  'w-4 h-4 transition-transform duration-200',
                  isActive(child.href) ? 'scale-110' : 'group-hover:scale-110'
                )} />
                <span>{child.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative',
        active
          ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-600/30'
          : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
      )}
    >
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r"></span>
      )}
      <item.icon className={cn(
        'w-5 h-5 transition-transform duration-200',
        active ? 'scale-110' : 'group-hover:scale-110'
      )} />
      <span>{item.label}</span>
      {item.badge && (
        <span className="ml-auto px-2 py-0.5 text-xs font-semibold bg-red-500/20 text-red-400 rounded-full">
          {item.badge}
        </span>
      )}
    </Link>
  );
}
