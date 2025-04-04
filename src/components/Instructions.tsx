import { useMemo } from "react";

interface InstructionsProps {
    volume: number;
    beans: number;
    bloom: number;
}
  
const Instructions: React.FC<InstructionsProps> = ({ volume, beans, bloom }) => {

    const remaining = useMemo(() => {
        const RAW = volume - bloom;
        return Math.round((RAW + Number.EPSILON) * 100) / 100;
    },[volume, bloom])

    return (
        <div>
            <ol>
                <li>Heat {volume}g water to 207&deg; F</li>
                <li>Grind {beans}g beans</li>
                <li>Bloom coffee with {bloom}g of water</li>
                <li>Wait 45 seconds</li>
                <li>Pour another {remaining}g water, totalling {volume}g</li>
            </ol>
        </div>
    );
};

export default Instructions