import { SessionProps } from './index';

export interface StoreData {
    accessToken?: string;
    scope?: string;
    storeHash: string;
}

export interface UserData {
    email: string;
    username?: string;
    storeHash: string;
}

export interface Db {
    setUser(session: SessionProps): Promise<void>;
    setStore(session: SessionProps): Promise<void>;
    getStoreToken(storeHash: string): string | null;
    deleteStore(session: SessionProps): Promise<void>;
}