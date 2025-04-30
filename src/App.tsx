import { useMemo, useState } from 'react';
import './App.css';
import Instructions from './components/Instructions';
import Strength from './components/Strength';
import Favorites from './components/Favorites';
import BrewSizes from './components/BrewSizes';
import RadioGroup from './components/RadioGroup';

import { RadioGroupOption } from './components/types';

/*
  g to oz
  g * .03527396

  beans
  water / ratio

  bloom
  beans * 2


  hsl(19deg, 71.6%, 14%)
*/

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

  const [serving, setServing] = useState(0)

  const handleRatioChange = (event:any) => {
    setRatio(event.target.value);
  }

  const handleFavorite = (event:string) => {
    
    setRatio(favorites[event].ratio);
    setServing(favorites[event].brew);
  }
  



  const calcWater = useMemo(() => {
    const RAW = serving/(1-(2/ratio))
    return Math.round((RAW + Number.EPSILON) * 100) / 100;
  },[serving, ratio])

  const calcBeans = useMemo(() => {
    const RAW = calcWater / ratio;
    return Math.round((RAW + Number.EPSILON) * 100) / 100;
  },[calcWater, ratio])

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
    
      <Favorites use_favorite ={handleFavorite} />

      <RadioGroup
        legend="strength"
        name="strength"
        options={strengthOptions}
        selectedValue={ratio}
        onChange={handleRatioChange}
      />

      <RadioGroup
        legend="size"
        name="size"
        options={brewSizeOptions}
        selectedValue={serving}
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
      />
    </main>
  )
}

export default App
