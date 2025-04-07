import { ChangeEvent, CSSProperties, FC, useMemo, useRef, useState } from 'react'
import styles from './Strength.module.scss';

interface BrewSizeOption {
    name:string;
    grams:number;
}

const brewSizeOptions:BrewSizeOption[] = [
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
  
interface BrewSizeProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}



const BrewSizes: FC<BrewSizeProps> = ({
  onChange,
}) => {
    const [isCustom, setIsCustom] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleToggle = () => {
        setIsCustom(!isCustom);
    };

    const customOz = useMemo(() => {
        if (inputRef?.current?.value) {
            const RAW = Number(inputRef.current.value) * .03527396;
            return Math.round((RAW + Number.EPSILON) * 100) / 100;
        }
        return 0
    },[inputRef?.current?.value])
    
    return (
        <div className={styles.flexContainer}>
            { !isCustom && 
            <fieldset className={styles.allOptions}>
                <legend>Brew Size</legend>
                {brewSizeOptions.map((option) => {
                    return (
                        <>
                        <input id={option.name} type="radio" name="brewSize" value={option.grams} onChange={onChange}/>
                        <label htmlFor={option.name} className={styles.option} style={{ '--strength': '15%'} as MyCustomCSS}>
                            {option.name}
                        </label>
                        </>
                    )
                })}
            </fieldset>
            }
            { isCustom && 
                <div>
                    <label htmlFor="custom-g">grams</label>
                    <input id="custom-g" type="number" onChange={onChange}  ref={inputRef} />
                    <span className={styles.notes}>~{customOz}oz</span>
                </div>
            }
            <button className={styles.toggleButton} onClick={handleToggle}>
                { isCustom ? 'ozs' : 'grams' }
            </button>
        </div>
    )
}

export default BrewSizes