import { ChangeEvent, FC } from 'react'
import styles from './Forms.module.scss';

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password' | 'range'
  label: string
  value: string | number
  name: string
  placeholder?: string
  error?: boolean
  disabled?: boolean
  min?: number
  max?: number
  step?: number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = ({
  type,
  label,
  value,
  name,
  placeholder,
  error,
  disabled,
  min,
  max,
  step,
  onChange,
}) => {
  return (
    <div className={styles.fieldContainer}>
      <label
        htmlFor={label}
        className={styles.label}
      >
        {label}
      </label>
      <input
        className={styles.input}
        type={type}
        id={label}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
      />
      {error && <p className="error">Input filed can't be empty!</p>}
    </div>
  )
}

export default Input