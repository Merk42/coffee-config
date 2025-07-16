import { useMemo, useState } from 'react';
import './App.css';
import Instructions from './components/Instructions';
import Favorites from './components/Favorites';
import RadioGroup from './components/RadioGroup';

import { RadioGroupOption } from './components/types';

const styleOptions:RadioGroupOption[] = [
  {
    label:'hot',
    value:0
  },
  {
    label:'iced',
    value:1
  }
]

const brewSizeOptions:RadioGroupOption[] = [
  {
    label:'6oz',
    value:170
  },
  {
    label:'8oz',
    value:227
  },
  {
    label:'12oz',
    value:340
  },
  {
    label:'16oz',
    value:454
  },
  {
    label:'20oz',
    value:577
  }
]

const strengthOptions:RadioGroupOption[] = [
  {
    label:'weak',
    value:18
  },
  {
    label:'mild',
    value:17
  },
  {
    label:'average',
    value:16
  },
  {
    label:'strong',
    value:15
  },
  {
    label:'robust',
    value:14
  }
]


function App() {

  interface Favorites {
    [key:string]: Favorite;
  }

  interface Favorite {
    water: number;
    ratio: number;
    brew: number;
  }

  const favorites:Favorites ={
    "simple":{
      water:224,
      ratio:16,
      brew: 196
    },
    "brown":{
      water:420,
      ratio:14,
      brew: 360
    }
  }

  const [ratio, setRatio] = useState(16)

  const [serving, setServing] = useState(170)

  const [iced, setIced] = useState(0)

  const handleRatioChange = (event:any) => {
    setRatio(event.target.value);
  }

  const handleFavorite = (event:string) => {   
    setRatio(favorites[event].ratio);
    setServing(favorites[event].brew);
    setIced(0)
  }
  
  const handleStyleChange = (event:any) => {
    setIced(event.target.value);
  }



  const calcWater = useMemo(() => {
    const RAW = serving/(1-(2/ratio))
    return Math.round((RAW + Number.EPSILON) * 100) / 100;
  },[serving, ratio])

  const calcBeans = useMemo(() => {
    const ICEDBEANS = !!Number(iced) ? 5 : 0;
    const RAW = calcWater / ratio;
    return (Math.round((RAW + Number.EPSILON) * 100) / 100) + ICEDBEANS;
  },[calcWater, ratio, iced])

  const calcBloom = useMemo(() => {
    const RAW = calcBeans * 2;
    return Math.round((RAW + Number.EPSILON) * 100) / 100;
  },[calcBeans])

  const handleServingChange = (event:any) => {
    setServing(event.target.value);
  };

  const gToOz = useMemo(() => {
    const RAW = serving * .03527396;
    return Math.round((RAW + Number.EPSILON) * 100) / 100;
  },[serving])

  return (
    <main className='max-w-3xl m-auto p-2'>
    
      <Favorites useFavorite={handleFavorite} />

      <RadioGroup
        selectedvalue={iced}
        legend="style"
        name="style"
        options={styleOptions}
        onChange={handleStyleChange}
      />

      <RadioGroup
        selectedvalue={ratio}
        legend="strength"
        name="strength"
        options={strengthOptions}
        onChange={handleRatioChange}
      />

      <RadioGroup
        selectedvalue={serving}
        legend="size"
        name="size"
        options={brewSizeOptions}
        onChange={handleServingChange}
      />


      <div className='flex mt-4 gap-1'>
        <label
          className='font-bold'
          htmlFor='finetune'>Tweak serving size (g)</label>
        <input
          className='w-24 border-yellow-800 border-2'
          id='finetune'
          type='number'
          value={serving}
          onChange={handleServingChange}/>
          <span>({gToOz}oz)</span>
      </div>
      <Instructions
       water={calcWater}
       beans={calcBeans}
       bloom={calcBloom}
       isIced={!!Number(iced)}
      />
    </main>
  )
}

export default App
