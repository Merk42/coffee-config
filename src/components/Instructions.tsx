import { useMemo } from "react";

interface InstructionsProps {
    water: number;
    beans: number;
    bloom: number;
    isIced: boolean;
}
  
const Instructions: React.FC<InstructionsProps> = ({ water, beans, bloom, isIced }) => {

    const ice = useMemo(() => {
        if (!isIced) {
            return 0
        }
        return Math.round((water * .4 + Number.EPSILON) * 100) / 100;
    }, [water,isIced])

    const remaining = useMemo(() => {
        const RAW = water - ice - bloom;
        return Math.round((RAW + Number.EPSILON) * 100) / 100;
    },[water, bloom, ice])

    return (
        <div className="mt-8 rounded-md bg-yellow-800 text-white p-8">
            <h2 className="text-2xl capitalize">instructions</h2>
            <ol className="list-decimal">
                <li>Heat at least {water}g water to 207&deg; F</li>
                <li>Grind {beans}g beans</li>
                { isIced && 
                    <li>Fill carafe with {ice}g ice</li>
                }
                <li>Bloom coffee with {bloom}g of water</li>
                <li>Wait 45 seconds</li>
                <li>Pour another {remaining}g water, totalling {water}g</li>
            </ol>
        </div>
    );
};

export default Instructions