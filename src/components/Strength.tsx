import { ChangeEvent, FC } from 'react'

interface StrengthProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Strength: FC<StrengthProps> = ({
  onChange,
}) => {
    return (
        <div>
            <fieldset>
                <legend>Strength</legend>
                <label style={{backgroundColor: 'hsl(19deg, 71.6%, 18%)', color: '#FFF'}}>
                    <input type="radio" name="strength" value={18} onChange={onChange}/>weak
                </label>
                <label style={{backgroundColor: 'hsl(19deg, 71.6%, 17%)', color: '#FFF'}}>
                    <input type="radio" name="strength" value={17} onChange={onChange}/>mild
                </label>
                <label style={{backgroundColor: 'hsl(19deg, 71.6%, 16%)', color: '#FFF'}}>
                    <input type="radio" name="strength" value={16} onChange={onChange}/>average
                </label>
                <label style={{backgroundColor: 'hsl(19deg, 71.6%, 15%)', color: '#FFF'}}>
                    <input type="radio" name="strength" value={15} onChange={onChange}/>strong
                </label>
                <label style={{backgroundColor: 'hsl(19deg, 71.6%, 14%)', color: '#FFF'}}>
                    <input type="radio" name="strength" value={14} onChange={onChange}/>robust
                </label>
            </fieldset>
        </div>
    )
}

export default Strength