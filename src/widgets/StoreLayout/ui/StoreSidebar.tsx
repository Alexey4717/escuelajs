'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  { href: '/', label: 'Главная', icon: '⊞' },
  { href: '#', label: 'Продукты', icon: '◫', disabled: true },
  { href: '#', label: 'Категории', icon: '◈', disabled: true },
];

export function StoreSidebar() {
  const pathname = usePathname();

  return (
    <aside>
      <h2>Каталог</h2>
      {nav.map((item) => (
        <Link
          key={item.href + item.label}
          href={item.disabled ? '#' : item.href}
          data-active={!item.disabled && pathname === item.href ? 'true' : 'false'}
          aria-disabled={item.disabled}
          onClick={(e) => item.disabled && e.preventDefault()}
        >
          <span aria-hidden>{item.icon}</span> {item.label}
        </Link>
      ))}
    </aside>
  );
}
