import {
  LayoutDashboard,
  Users,
  Dumbbell,
  Calendar,
  CreditCard,
  TrendingUp,
  Settings,
  UserPlus,
  Target,
  Award,
  MessageSquare,
  Bell,
  FileText,
  Database,
  Shield,
  Activity,
  ClipboardList,
  BarChart3,
  BookOpen,
} from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: any;
  badge?: string | number;
  children?: NavItem[];
}

export const navigationConfig: Record<string, NavItem[]> = {
  // Super Admin Navigation
  SUPER_ADMIN: [
    {
      label: 'Dashboard',
      href: '/super-admin',
      icon: LayoutDashboard,
    },
    {
      label: 'All Users',
      href: '/super-admin/users',
      icon: Users,
    },
    {
      label: 'Admins',
      href: '/super-admin/admins',
      icon: Shield,
    },
    {
      label: 'System Settings',
      href: '/super-admin/system-settings',
      icon: Settings,
    },
    {
      label: 'Audit Logs',
      href: '/super-admin/audit-logs',
      icon: FileText,
    },
    {
      label: 'Database',
      href: '/super-admin/database',
      icon: Database,
    },
  ],

  // Admin Navigation
  ADMIN: [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
    },
    {
      label: 'Members',
      href: '/admin/members',
      icon: Users,
      children: [
        { label: 'All Members', href: '/admin/members', icon: Users },
        { label: 'Add Member', href: '/admin/members/create', icon: UserPlus },
      ],
    },
    {
      label: 'Trainers',
      href: '/admin/trainers',
      icon: Dumbbell,
      children: [
        { label: 'All Trainers', href: '/admin/trainers', icon: Dumbbell },
        { label: 'Add Trainer', href: '/admin/trainers/create', icon: UserPlus },
      ],
    },
    {
      label: 'Plans',
      href: '/admin/plans',
      icon: ClipboardList,
    },
    {
      label: 'Payments',
      href: '/admin/payments',
      icon: CreditCard,
    },
    {
      label: 'Attendance',
      href: '/admin/attendance',
      icon: Calendar,
    },
    {
      label: 'Classes',
      href: '/admin/classes',
      icon: Activity,
    },
    {
      label: 'Reports',
      href: '/admin/reports',
      icon: BarChart3,
      children: [
        { label: 'Revenue', href: '/admin/reports/revenue', icon: CreditCard },
        { label: 'Attendance', href: '/admin/reports/attendance', icon: Calendar },
        { label: 'Members', href: '/admin/reports/members', icon: Users },
        { label: 'Trainers', href: '/admin/reports/trainers', icon: Dumbbell },
      ],
    },
    {
      label: 'Notifications',
      href: '/admin/notifications',
      icon: Bell,
    },
    {
      label: 'Messages',
      href: '/admin/messages',
      icon: MessageSquare,
    },
    {
      label: 'Settings',
      href: '/admin/settings',
      icon: Settings,
    },
  ],

  // Trainer Navigation
  TRAINER: [
    {
      label: 'Dashboard',
      href: '/trainer',
      icon: LayoutDashboard,
    },
    {
      label: 'My Members',
      href: '/trainer/my-members',
      icon: Users,
    },
    {
      label: 'Workout Plans',
      href: '/trainer/workout-plans',
      icon: BookOpen,
      children: [
        { label: 'All Plans', href: '/trainer/workout-plans', icon: BookOpen },
        { label: 'Create Plan', href: '/trainer/workout-plans/create', icon: UserPlus },
      ],
    },
    {
      label: 'Classes',
      href: '/trainer/classes',
      icon: Activity,
    },
    {
      label: 'Schedule',
      href: '/trainer/schedule',
      icon: Calendar,
    },
    {
      label: 'Performance',
      href: '/trainer/performance',
      icon: TrendingUp,
    },
    {
      label: 'Reviews',
      href: '/trainer/reviews',
      icon: Award,
    },
    {
      label: 'Messages',
      href: '/trainer/messages',
      icon: MessageSquare,
    },
    {
      label: 'Settings',
      href: '/trainer/settings',
      icon: Settings,
    },
  ],

  // Member Navigation
  MEMBER: [
    {
      label: 'Dashboard',
      href: '/member',
      icon: LayoutDashboard,
    },
    {
      label: 'Find Trainer',
      href: '/member/find-trainer',
      icon: Target,
      badge: 'AI',
    },
    {
      label: 'My Trainer',
      href: '/dashboard/member/my-trainer',
      icon: Dumbbell,
    },
    {
      label: 'Workout Plan',
      href: '/member/workout-plan',
      icon: BookOpen,
    },
    {
      label: 'Progress',
      href: '/member/progress',
      icon: TrendingUp,
      children: [
        { label: 'Overview', href: '/member/progress', icon: TrendingUp },
        { label: 'Body Metrics', href: '/member/progress/metrics', icon: Activity },
        { label: 'Photos', href: '/member/progress/photos', icon: Award },
      ],
    },
    {
      label: 'My Classes',
      href: '/member/classes',
      icon: Activity,
    },
    {
      label: 'Membership',
      href: '/member/membership',
      icon: ClipboardList,
    },
    {
      label: 'Payments',
      href: '/member/payments',
      icon: CreditCard,
    },
    {
      label: 'Messages',
      href: '/member/messages',
      icon: MessageSquare,
    },
    {
      label: 'Settings',
      href: '/member/settings',
      icon: Settings,
    },
  ],
};