'use client';
import { useContext, createContext, useState, useMemo, ReactNode } from 'react';

const context = createContext<{
 value: string;
 setValue: (newValue: string) => void;
} | null>(null);

function useTestContext() {
 const value = useContext(context);
 if (!value) throw new Error('context is null');
 return value;
}

export default function Context({ children }: { children: ReactNode }) {
 const [value, setValue] = useState('test');

 const contextValue = useMemo(() => ({ value, setValue }), [value]);
 return <context.Provider value={contextValue}>{children}</context.Provider>;
}

export { context, useTestContext };
