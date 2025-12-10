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
  Database,
  Shield,
  Activity,
  ClipboardList,
  BarChart3,
  BookOpen,
  Users2,
} from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: any;
  badge?: string | number;
  children?: NavItem[];
}

export const navigationConfig: Record<string, NavItem[]> = {

  SUPER_ADMIN: [
    {
      label: 'Dashboard',
      href: '/dashboard/admin',
      icon: LayoutDashboard,
    },
    {
      label: 'Users',
      href: '/dashboard/admin/users',
      icon: Users,
    },
    {
      label: 'Members',
      href: '/dashboard/admin/members',
      icon: Users2,
      children: [
        { label: 'All Members', href: '/dashboard/admin/members', icon: Users },
        { label: 'Add Member', href: '/dashboard/admin/members/create', icon: UserPlus },
      ],
    },
    {
      label: 'Trainers',
      href: '/dashboard/admin/trainers',
      icon: Dumbbell,
      children: [
        { label: 'All Trainers', href: '/dashboard/admin/trainers', icon: Dumbbell },
        { label: 'Add Trainer', href: '/dashboard/admin/trainers/create', icon: UserPlus },
      ],
    },
    {
      label: 'Plans',
      href: '/dashboard/admin/plans',
      icon: ClipboardList,
      children: [
        { label: 'All Plans', href: '/dashboard/admin/plans', icon: ClipboardList },
        { label: 'Create Plan', href: '/dashboard/admin/plans/create', icon: UserPlus },
      ],
    },
    {
      label: 'Payments',
      href: '/dashboard/admin/payment',
      icon: CreditCard,
    },
    {
      label: 'Attendance',
      href: '/dashboard/admin/attendance',
      icon: Calendar,
    },
    {
      label: 'Classes',
      href: '/dashboard/admin/classes',
      icon: Activity,
      children: [
        { label: 'All Classes', href: '/dashboard/admin/classes', icon: Activity },
        { label: 'Create Class', href: '/dashboard/admin/classes/create', icon: UserPlus },
      ],
    },
    {
      label: 'Reports',
      href: '/dashboard/admin/reports',
      icon: BarChart3,
      children: [
        { label: 'Overview', href: '/dashboard/admin/reports', icon: BarChart3 },
        { label: 'Revenue', href: '/dashboard/admin/reports/revenue', icon: CreditCard },
        { label: 'Attendance', href: '/dashboard/admin/reports/attendance', icon: Calendar },
        { label: 'Members', href: '/dashboard/admin/reports/members', icon: Users },
        { label: 'Trainers', href: '/dashboard/admin/reports/trainers', icon: Dumbbell },
      ],
    },
    {
      label: 'Admins',
      href: '/dashboard/admin/admins',
      icon: Shield,
    },
    {
      label: 'System Settings',
      href: '/dashboard/admin/system-settings',
      icon: Settings,
    },
    {
      label: 'Database',
      href: '/dashboard/admin/database',
      icon: Database,
    },
    {
      label: 'Settings',
      href: '/dashboard/admin/settings',
      icon: Settings,
      children: [
        { label: 'General', href: '/dashboard/admin/settings', icon: Settings },
        { label: 'System', href: '/dashboard/admin/settings/system', icon: Database },
        { label: 'Users', href: '/dashboard/admin/settings/users', icon: Users },
      ],
    },
  ],

  // Admin Navigation
  ADMIN: [
    {
      label: 'Dashboard',
      href: '/dashboard/admin',
      icon: LayoutDashboard,
    },
    {
      label: 'Members',
      href: '/dashboard/admin/members',
      icon: Users,
      children: [
        { label: 'All Members', href: '/dashboard/admin/members', icon: Users },
        { label: 'Add Member', href: '/dashboard/admin/members/create', icon: UserPlus },
      ],
    },
    {
      label: 'Trainers',
      href: '/dashboard/admin/trainers',
      icon: Dumbbell,
      children: [
        { label: 'All Trainers', href: '/dashboard/admin/trainers', icon: Dumbbell },
        { label: 'Add Trainer', href: '/dashboard/admin/trainers/create', icon: UserPlus },
      ],
    },
    {
      label: 'Plans',
      href: '/dashboard/admin/plans',
      icon: ClipboardList,
      children: [
        { label: 'All Plans', href: '/dashboard/admin/plans', icon: ClipboardList },
        { label: 'Create Plan', href: '/dashboard/admin/plans/create', icon: UserPlus },
      ],
    },
    {
      label: 'Payments',
      href: '/dashboard/admin/payment',
      icon: CreditCard,
    },
    {
      label: 'Attendance',
      href: '/dashboard/admin/attendance',
      icon: Calendar,
    },
    {
      label: 'Classes',
      href: '/dashboard/admin/classes',
      icon: Activity,
      children: [
        { label: 'All Classes', href: '/dashboard/admin/classes', icon: Activity },
        { label: 'Create Class', href: '/dashboard/admin/classes/create', icon: UserPlus },
      ],
    },
    {
      label: 'Reports',
      href: '/dashboard/admin/reports',
      icon: BarChart3,
      children: [
        { label: 'Overview', href: '/dashboard/admin/reports', icon: BarChart3 },
        { label: 'Revenue', href: '/dashboard/admin/reports/revenue', icon: CreditCard },
        { label: 'Attendance', href: '/dashboard/admin/reports/attendance', icon: Calendar },
        { label: 'Members', href: '/dashboard/admin/reports/members', icon: Users },
        { label: 'Trainers', href: '/dashboard/admin/reports/trainers', icon: Dumbbell },
      ],
    },
  ],

  // Trainer Navigation
  TRAINER: [
    {
      label: 'Dashboard',
      href: '/dashboard/trainer',
      icon: LayoutDashboard,
    },
    {
      label: 'My Clients',
      href: '/dashboard/trainer/my-menbers',
      icon: Users,
    },
    {
      label: 'Workout Plans',
      href: '/dashboard/trainer/workout-plans',
      icon: BookOpen,
      children: [
        { label: 'All Plans', href: '/dashboard/trainer/workout-plans', icon: BookOpen },
        { label: 'Create Plan', href: '/dashboard/trainer/workout-plans/create', icon: UserPlus },
      ],
    },
    {
      label: 'Classes',
      href: '/dashboard/trainer/classes',
      icon: Activity,
    },
    {
      label: 'Schedule',
      href: '/dashboard/trainer/schedule',
      icon: Calendar,
    },
    {
      label: 'Performance',
      href: '/dashboard/trainer/performance',
      icon: TrendingUp,
    },
    {
      label: 'Reviews',
      href: '/dashboard/trainer/reviews',
      icon: Award,
    },
    {
      label: 'Profile',
      href: '/dashboard/trainer/profile',
      icon: Users,
    },
  ],

  // Member Navigation
  MEMBER: [
    {
      label: 'Dashboard',
      href: '/dashboard/member',
      icon: LayoutDashboard,
    },
    {
      label: 'Find Trainer',
      href: '/dashboard/member/find-trainer',
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
      href: '/dashboard/member/workout-plan',
      icon: BookOpen,
    },
    {
      label: 'Progress',
      href: '/dashboard/member/progress',
      icon: TrendingUp,
      children: [
        { label: 'Overview', href: '/dashboard/member/progress', icon: TrendingUp },
        { label: 'Body Metrics', href: '/dashboard/member/progress/metrics', icon: Activity },
        { label: 'Photos', href: '/dashboard/member/progress/photos', icon: Award },
      ],
    },
    {
      label: 'My Classes',
      href: '/dashboard/member/classes',
      icon: Activity,
    },
    {
      label: 'Membership',
      href: '/dashboard/member/membership',
      icon: ClipboardList,
      children: [
        { label: 'Current Plan', href: '/dashboard/member/membership', icon: ClipboardList },
        { label: 'Renew', href: '/dashboard/member/membership/renew', icon: CreditCard },
      ],
    },
    {
      label: 'Payments',
      href: '/dashboard/member/payments',
      icon: CreditCard,
    },
    {
      label: 'Profile',
      href: '/dashboard/member/profile',
      icon: Users,
    },
  ],
};