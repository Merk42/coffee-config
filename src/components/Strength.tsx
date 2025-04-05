import { ChangeEvent, CSSProperties, FC } from 'react'
import styles from './Strength.module.scss';

interface StrengthOption {
    name:string;
    ratio:number;
}

const strengthOptions:StrengthOption[] = [
    {
        name:'weak',
        ratio:18
    },
    {
        name:'mild',
        ratio:17
    },
    {
        name:'average',
        ratio:16
    },
    {
        name:'strong',
        ratio:15
    },
    {
        name:'robust',
        ratio:14
    }
]

interface MyCustomCSS extends CSSProperties {
    '--strength': string;
}
  
interface StrengthProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Strength: FC<StrengthProps> = ({
  onChange,
}) => {
    return (
        <div>
            <fieldset className={styles.allOptions}>
                <legend>Strength</legend>
                {strengthOptions.map((option) => {
                    return (
                        <>
                        <input id={option.name} type="radio" name="strength" value={option.ratio} onChange={onChange}/>
                        <label htmlFor={option.name} className={styles.option} style={{ '--strength': option.ratio + '%'} as MyCustomCSS}>
                            {option.name}
                        </label>
                        </>
                    )
                })}
            </fieldset>
        </div>
    )
}

export default Strength