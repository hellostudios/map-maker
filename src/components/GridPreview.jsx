const GridPreview = ({ gridType, gridSize }) => {
    return (
        <div>
            <h3>Grid Preview</h3>
            <p>
                {gridType === 'square'
                    ? `A ${gridSize}x${gridSize} square grid.`
                    : `A ${gridSize}-size hexagonal grid.`}
            </p>
            {/* Render preview here */}
        </div>
    );
};

export default GridPreview;
