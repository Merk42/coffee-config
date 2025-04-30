import { RadioButtonProps, RadioGroupProps } from "./types";  

function CustomRadioButton({ name, value, label, checked, onChange }:RadioButtonProps) {
  return (
    <span className='flex grow'>
        <input
            className="hidden peer"
            id={value.toString()}
            type="radio"
            name={name}
            value={value}
            onChange={onChange}/>
        <label
            className="cursor-pointer grow text-center border-yellow-800 border-2 p-2 rounded-md peer-checked:bg-yellow-800 peer-checked:text-white"
            htmlFor={value.toString()}>
            {label}
        </label>
    </span>
  );
}

function RadioGroup({ legend, name, options, selectedValue, onChange }:RadioGroupProps) {
  return (
    <fieldset className="mt-4">
        <legend className="font-bold">{legend}</legend>
        <div className="flex gap-2">
        {options.map((option) => (
            <CustomRadioButton
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            checked={selectedValue === option.value}
            onChange={onChange}
            />
        ))}
        </div>
    </fieldset>
  );
}

export default RadioGroup