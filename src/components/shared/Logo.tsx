import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center group">
      <Image
        src="/Logo.png"
        alt="GymFlow Logo"
        width={40}
        height={40}
        className="rounded-lg"
      />
      <span className="text-xl lg:text-2xl mt-4 font-bold text-white">
        Gym
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Flow
        </span>
      </span>

    </Link>
  );
}
