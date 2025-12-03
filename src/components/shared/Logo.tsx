import Link from 'next/link';
import { Dumbbell } from 'lucide-react';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
        <Dumbbell className="w-5 h-5 text-white" />
      </div>
      <span className="text-xl font-bold text-gray-900 dark:text-white">
        PowerFit
      </span>
    </Link>
  );
}
