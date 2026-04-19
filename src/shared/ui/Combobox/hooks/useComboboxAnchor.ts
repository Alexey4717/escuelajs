import { useRef } from 'react';

export const useComboboxAnchor = () => useRef<HTMLDivElement | null>(null);
