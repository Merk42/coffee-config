import { ChangeEventHandler, useMemo } from 'react';
import { RadioGroupOption } from "./types";

interface ServingType {
    options: RadioGroupOption[];
    value: string|number;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

function Serving({value, onChange, options}:ServingType) {

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
                    <input id='size' className="w-full accent-yellow-800" type="range" min={0} max={700} list="rangeOptions" value={value} onChange={onChange}/>
                    <datalist className="relative block" id="rangeOptions">
                        {optionWidth.map((option) => (
                            <option style={{ left: `${option.left}%` }} className="absolute -translate-x-1/2" value={option.value} label={option.label}></option>
                        ))}
                    </datalist>
                </div>
                <div className='flex-none flex gap-2 hidden'>
                    <button className='cursor-pointer grow text-center border-yellow-800 border-2 p-2 rounded-md peer-checked:bg-yellow-800 peer-checked:text-white'>-</button>
                    <button className='cursor-pointer grow text-center border-yellow-800 border-2 p-2 rounded-md peer-checked:bg-yellow-800 peer-checked:text-white'>+</button>
                </div>
            </div>
            

        </div>
    )
}

export default Serving