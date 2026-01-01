import { BUTTON_RADIO } from "./styling";
import { RadioButtonProps, RadioGroupProps } from "./types";  

function CustomRadioButton({ name, value, label, selectedvalue, onChange, legend }:RadioButtonProps) {
  return (
    <span className='flex grow'>
        <input
            className="hidden peer"
            id={legend + '-' + value.toString()}
            type="radio"
            name={name}
            value={value}
            checked={selectedvalue.toString() === value.toString()}
            onChange={onChange}/>
        <label
            className={BUTTON_RADIO}
            htmlFor={legend + '-' + value.toString()}>
            {label}
        </label>
    </span>
  );
}

function RadioGroup({ legend, name, options, selectedvalue, onChange }:RadioGroupProps) {
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
          selectedvalue={selectedvalue}
          legend={legend}
          onChange={onChange}
          />
      ))}
      </div>
    </fieldset>
  );
}

export default RadioGroup