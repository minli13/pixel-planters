import { createContext, useContext } from 'react';

export const GardenContext = createContext(null);

export function useGarden() {
    return useContext(GardenContext);
}