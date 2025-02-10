import { Box, Grid2 as Grid } from "@mui/material";
import { Schema } from "../amplify/data/resource";


interface GardenSVGProps {
    garden: Schema["Garden"]["createType"];
    // plannedSteps: Schema["PlannedStep"]["createType"]["step"][""];
    // plantRows?: Schema["PlantRow"]["type"][];
    plantRows?: Schema["PlantedPlantRow"]["createType"]["info"][];
}

// const GardenSVG: React.FC<GardenSVGProps> = ({ garden, plannedSteps }) => {
export const createGardenSVG = ({ garden, plantRows }: GardenSVGProps) => {
    const getSpeciesColorMap = () => {
        const map = new Map<string, string>();
        plantRows?.forEach(row => {
            if (row?.species && !map.has(row.species)) {
                const colors = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                map.set(row.species, color);
            }
        });
        return map;
    };
    const speciesColorMap = getSpeciesColorMap()

    const renderPlantRows = () => {
        if (plantRows) return plantRows
            .filter(row => (row && row.location && row.species))
            .map((row, rowIndex) => (
                <g key={`row-${rowIndex}`}>
                    <line
                        x1={row!.location!.start.x}
                        y1={row!.location!.start.y}
                        x2={row!.location!.end.x}
                        y2={row!.location!.end.y}
                        stroke={speciesColorMap.get(row!.species!) || '#000000'}
                        strokeWidth={row!.plantSpacingInMeters || 0.1}
                    />
                </g>
            ))
        // );
    };

    const renderLegend = () => {
        return (
            <g className="legend">
                {[...speciesColorMap.entries()].map(([species, color], index) => (
                    <g key={`legend-${index}`} transform={`translate(0, ${index * 0.5})`}>
                        <rect x="0" y="1" width="1" height=".4" fill={color} />
                        <text x="1" y="1.3" fontSize=".3" fill="black">{species}</text>
                    </g>
                ))}
            </g>
        );
    };



    const renderPerimeter = () => {
        if (!garden.perimeterPoints) return;
        const points = garden.perimeterPoints.filter(point => point).map(point => `${point!.x},${point!.y}`).join(' ');
        return <polygon points={points} fill="saddlebrown" strokeWidth="0" stroke="black" />;
    };

    const getViewBox = () => {
        if (!garden.perimeterPoints) return "0 0 10 10";
        const xValues = garden.perimeterPoints.map(point => point!.x);
        const yValues = garden.perimeterPoints.map(point => point!.y);
        const minX = Math.min(...xValues);
        const maxX = Math.max(...xValues);
        const minY = Math.min(...yValues);
        const maxY = Math.max(...yValues);
        return `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;
    };

    return (
        <Box 
        display="flex" flexDirection="column" gap={1} height="100%">
            <svg 
            viewBox={getViewBox()} 
            style={{ 
                flexGrow: 1, 
                width: '100%',
                maxWidth: '200px',
                // border: '1px solid black'
            }}
            >
                {renderPerimeter()}
                {renderPlantRows()}
            </svg>
            <svg 
            viewBox="0 0 4 4" 
            style={{ 
                flexGrow: 1, 
                width: '200px', 
                // border: '1px solid black'
                }}>
                {renderLegend()}
            </svg>
        </Box>

    );
};