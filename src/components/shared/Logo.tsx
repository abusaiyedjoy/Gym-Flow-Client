import Link from 'next/link';
import { Dumbbell } from 'lucide-react';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 group">
      <div className="p-2 bg-red-600 rounded-lg group-hover:bg-red-700 transition-colors">
        <Dumbbell className="w-6 h-6 text-white" />
      </div>
      <span className="text-xl lg:text-2xl font-bold text-white">
        Gym<span className="text-red-600">Flow</span>
      </span>
    </Link>
  );
}
