import { ChangeEventHandler } from 'react';

export interface RadioGroupOption {
    value: string|number;
    label: string;
}

export interface RadioGroupProps {
    legend: string;
    name: string;
    options: RadioGroupOption[];
    selectedvalue: string|number;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export interface RadioButtonProps {
    name: string;
    value: string|number;
    label: string;
    selectedvalue: string|number;
    legend: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}