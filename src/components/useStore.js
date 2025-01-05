import { create } from 'zustand'

const useStore = create((set) => ({
    activeMode: 'move', // Initial mode
    setActiveMode: (newMode) => set({ activeMode: newMode }), // Function to update the mode
}));

export default useStore;
