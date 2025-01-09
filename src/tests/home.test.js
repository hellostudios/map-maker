// Test cases for the updated HomePage component
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from './HomePage';
import { getMapsFromFirebase } from '../services/firebaseService';

jest.mock('../services/firebaseService');

describe('HomePage Component', () => {
    test('renders loading message initially', async () => {
        getMapsFromFirebase.mockResolvedValue([]);

        render(<HomePage />);

        expect(screen.getByText(/Loading maps.../i)).toBeInTheDocument();
    });

    test('renders list of maps', async () => {
        getMapsFromFirebase.mockResolvedValue([
            { id: '1', name: 'Map 1', gridType: 'square', gridSize: 10 },
            { id: '2', name: 'Map 2', gridType: 'hexagon', gridSize: 20 },
        ]);

        render(<HomePage />);

        await waitFor(() => {
            expect(screen.getByText(/Map 1 - Grid: square, Size: 10/i)).toBeInTheDocument();
            expect(screen.getByText(/Map 2 - Grid: hexagon, Size: 20/i)).toBeInTheDocument();
        });
    });

    test('shows new map form when create button is clicked', async () => {
        getMapsFromFirebase.mockResolvedValue([]);

        render(<HomePage />);

        fireEvent.click(screen.getByText(/Create New Map/i));

        expect(screen.getByText(/Create New Map/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Grid Type:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Grid Size:/i)).toBeInTheDocument();
    });
});