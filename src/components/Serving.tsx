import { ChangeEventHandler, useMemo } from 'react';
import { RadioGroupOption } from "./types";
import { BUTTON_BASE } from './styling';

interface ServingType {
    options: RadioGroupOption[];
    value: string|number;
    onChange: ChangeEventHandler<HTMLInputElement>;
    tweak: (...args: [number]) => void;
}

function Serving({value, onChange, options, tweak}:ServingType) {

    const MAX = 700;

    const optionWidth = useMemo(() => {
        return options.map(user => {
            return {
                value: user.value,
                label: user.label,
                left: (Number(user.value) / MAX) * 100
            };
        });
    }, [options])

    return (
        <div className="mt-4 pb-4">
            <label htmlFor='size' className="font-bold">size</label>
            <div className='flex gap-4'>
                <div className='flex-auto'>
                    <input id='size' className="w-full accent-yellow-800" type="range" min={0} max={MAX} list="rangeOptions" value={value} onChange={onChange}/>
                    <datalist className="relative block" id="rangeOptions">
                        {optionWidth.map((option) => (
                            <option style={{ left: `${option.left}%` }} className="absolute -translate-x-1/2 text-sm" value={option.value} label={option.label}>
                            </option>
                        ))}
                    </datalist>
                </div>
                <div className='flex-none flex gap-2'>
                    <button onClick={() => tweak(Number(value)-1)} disabled={value === 0} className={'w-12 ' + BUTTON_BASE}>-</button>
                    <button onClick={() => tweak(Number(value)+1)} disabled={value === MAX} className={'w-12 ' + BUTTON_BASE}>+</button>
                </div>
            </div>
            

        </div>
    )
}

export default Serving