import { ChangeEvent, CSSProperties, FC, useState } from 'react'
import styles from './Strength.module.scss';

interface CupOption {
    name:string;
    grams:number;
}

const cupOptions:CupOption[] = [
    {
        name:'6oz',
        grams:170
    },
    {
        name:'8oz',
        grams:227
    },
    {
        name:'12oz',
        grams:340
    },
    {
        name:'16oz',
        grams:454
    },
    {
        name:'20oz',
        grams:577
    }
]

interface MyCustomCSS extends CSSProperties {
    '--strength': string;
}
  
interface CupProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}



const Cups: FC<CupProps> = ({
  onChange,
}) => {
    const [isCustom, setIsCustom] = useState(false);
    const handleToggle = () => {
        setIsCustom(!isCustom);
    };
    
    return (
        <div>
            <fieldset className={styles.allOptions}>
                <legend>Cup</legend>
                {cupOptions.map((option) => {
                    return (
                        <>
                        <input id={option.name} type="radio" name="cup" value={option.grams} onChange={onChange}/>
                        <label htmlFor={option.name} className={styles.option} style={{ '--strength': '15%'} as MyCustomCSS}>
                            {option.name}
                        </label>
                        </>
                    )
                })}
                {/*
                <button onClick={handleToggle}>custom</button>
                */}
                
            </fieldset>
            { isCustom && 
                <>
                <label>g</label>
                <input type="number" />
                </>
            }
        </div>
    )
}

export default Cups