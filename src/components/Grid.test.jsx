// src/components/Grid.test.jsx
import React from 'react';
import { render } from '@testing-library/react';
import Grid from './Grid';

test('renders square grid when type is square', () => {
    const { container } = render(<Grid type="square" />);
    const gridHelper = container.querySelector('gridHelper');
    expect(gridHelper).toBeInTheDocument();
});

test('renders hexagon grid when type is hexagon', () => {
    const { container } = render(<Grid type="hexagon" />);
    const lineSegments = container.querySelector('lineSegments');
    expect(lineSegments).toBeInTheDocument();
});

test('renders nothing for unsupported grid type', () => {
    const { container } = render(<Grid type="triangle" />);
    expect(container.firstChild).toBeNull();
});
