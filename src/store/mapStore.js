// src/store/mapStore.js
import { create } from 'zustand'

const useMapStore = create((set) => ({
    activeTool: 'move', // Currently selected tool
    setActiveTool: (tool) => set({ activeTool: tool }),
}));

export default useMapStore;
