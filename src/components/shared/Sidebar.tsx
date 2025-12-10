'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, ChevronRight, X, LogOut, Dumbbell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navigationConfig } from '@/lib/navigation.config';
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

  const navItems = navigationConfig[userRole!] || navigationConfig['MEMBER'];

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logoutUser();
      router.push('/signin');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Auto-expand parent items for active pages
  useEffect(() => {
    const activeParents: string[] = [];

    navItems.forEach((item: any) => {
      if (item.children) {
        const isActiveChild = item.children.some((child: any) =>
          pathname === child.href || pathname.startsWith(child.href)
        );
        if (isActiveChild) activeParents.push(item.label);
      }
    });

    setExpandedItems(activeParents);
  }, [pathname, navItems]);

  const toggleExpand = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
    );
  };

  const isActive = (href: string) => pathname === href;

const isParentActive = (item: any) =>
  pathname === item.href ||
  item.children?.some((child: any) => pathname === child.href);


  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 shadow-md transition-transform duration-300',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <Link href="/" className="flex items-center space-x-2 group">
      <div className="p-2 bg-red-600 rounded-lg group-hover:bg-red-700 transition-colors">
        <Dumbbell className="w-6 h-6 text-white" />
      </div>
      <span className="text-xl lg:text-2xl font-bold text-red-600">
        Gym<span className="text-red-600">Flow</span>
      </span>
    </Link>
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <div className="overflow-y-auto p-3" style={{ maxHeight: 'calc(100vh - 150px)' }}>
        {navItems.map(item => (
          <NavItem
            key={item.label}
            item={item}
            isActive={isActive}
            isParentActive={isParentActive}
            expandedItems={expandedItems}
            toggleExpand={toggleExpand}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
        >
          <LogOut className="w-5 h-5" />
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>

        <p className="text-center text-xs text-gray-400 mt-3">GymFlow v1.0</p>
      </div>
    </aside>
  );
}

/* -------------------------------------------------- */
/* NAV ITEM */
/* -------------------------------------------------- */

function NavItem({ item, isActive, isParentActive, expandedItems, toggleExpand }: any) {
  const hasChildren = item.children?.length > 0;
  const active = isParentActive(item);
  const isExpanded = expandedItems.includes(item.label);

  if (hasChildren) {
    return (
      <div className="mb-1">
        {/* Parent Button */}
        <button
          onClick={() => toggleExpand(item.label)}
          className={cn(
            'w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors',
            active
              ? 'bg-red-100 text-red-600'
              : 'hover:bg-gray-100 text-gray-700'
          )}
        >
          <div className="flex items-center gap-3">
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </div>

          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        {/* Child Links */}
        {isExpanded && (
          <div className="ml-5 mt-1 space-y-1 border-l pl-3 border-gray-200">
            {item.children.map((child: any) => (
              <Link
                key={child.label}
                href={child.href}
                className={cn(
                  'flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors',
                  isActive(child.href)
                    ? 'text-red-600 bg-red-50 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                <child.icon className="w-4 h-4" />
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Single Item Link
  return (
    <Link
      href={item.href}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
        active
          ? 'bg-red-100 text-red-600'
          : 'text-gray-700 hover:bg-gray-100'
      )}
    >
      <item.icon className="w-5 h-5" />
      {item.label}
    </Link>
  );
}
