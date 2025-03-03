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

    const shouldSwitchXY = () => {
        if (!garden.perimeterPoints) return false;
        const xValues = garden.perimeterPoints.map(point => point!.x);
        const yValues = garden.perimeterPoints.map(point => point!.y);
        return Math.max(...yValues) > Math.max(...xValues);
    };

    const switchXY = (point: { x: number, y: number }) => {
        return shouldSwitchXY() ? { x: point.y, y: point.x } : point;
    };

    const renderPlantRows = () => {
        if (plantRows) return plantRows
            .filter(row => (row && row.location && row.species))
            .map((row, rowIndex) => {
                const start = switchXY(row!.location!.start);
                const end = switchXY(row!.location!.end);
                return (
                    <g key={`row-${rowIndex}`}>
                        <line
                            x1={start.x}
                            y1={start.y}
                            x2={end.x}
                            y2={end.y}
                            stroke={speciesColorMap.get(row!.species!) || '#000000'}
                            strokeWidth={(row!.rowSpacingCm || 0.1) / 100}
                        />
                    </g>
                );
            });
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
        const points = garden.perimeterPoints.filter(point => point).map(point => {
            const switchedPoint = switchXY(point!);
            return `${switchedPoint.x},${switchedPoint.y}`;
        }).join(' ');
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
        return shouldSwitchXY() ? `${minY} ${minX} ${maxY - minY} ${maxX - minX}` : `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;
        // return `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;
    };

    return (
        <Box 
        display="flex" flexDirection="column" gap={1} height="100%">
            <svg 
            viewBox={getViewBox()} 
            style={{ 
                flexGrow: 1, 
                flexShrink: 1,
                // width: '100%',
                maxHeight: '500px',
                maxWidth: '500px',
                // border: '1px solid black',
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