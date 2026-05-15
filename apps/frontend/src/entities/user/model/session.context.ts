import { createContext } from 'react';
import type { SessionContextType } from './user.type';

export const SessionContext = createContext<SessionContextType | null>(null);
