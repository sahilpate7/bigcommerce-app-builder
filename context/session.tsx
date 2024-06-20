import { createContext, useContext, useState, useEffect } from 'react';
import { ContextValues } from '../types';
import { useRouter } from 'next/router';

const SessionContext = createContext<Partial<ContextValues>>({});

const SessionProvider = ({ children }) => {
    const { query } = useRouter();
    const [context, setContext] = useState('');

    useEffect(() => {
        if (query.context) {
            setContext(query.context.toString());
        }
    }, [query.context]);

    return (
        <SessionContext.Provider value={{ context }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => useContext(SessionContext);

export default SessionProvider;