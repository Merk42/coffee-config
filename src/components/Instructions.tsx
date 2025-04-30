import { useMemo } from "react";
import styles from './Instructions.module.scss';

interface InstructionsProps {
    water: number;
    beans: number;
    bloom: number;
}
  
const Instructions: React.FC<InstructionsProps> = ({ water, beans, bloom }) => {

    const remaining = useMemo(() => {
        const RAW = water - bloom;
        return Math.round((RAW + Number.EPSILON) * 100) / 100;
    },[water, bloom])

    return (
        <div className="mt-8 rounded-md bg-yellow-800 text-white p-8">
            <h2 className="text-2xl">instructions</h2>
            <ol>
                <li>Heat at least {water}g water to 207&deg; F</li>
                <li>Grind {beans}g beans</li>
                <li>Bloom coffee with {bloom}g of water</li>
                <li>Wait 45 seconds</li>
                <li>Pour another {remaining}g water, totalling {water}g</li>
            </ol>
        </div>
    );
};

export default Instructions