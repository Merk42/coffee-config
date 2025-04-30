import { ChangeEventHandler } from 'react';

export interface RadioGroupOption {
    value: string|number;
    label: string;
}

export interface RadioGroupProps {
    legend: string;
    name: string;
    options: RadioGroupOption[];
    selectedValue: string|number;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export interface RadioButtonProps {
    name: string;
    value: string|number;
    label: string;
    checked: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
}