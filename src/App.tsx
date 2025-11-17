import { useMemo, useState } from 'react';
import './App.css';
import Instructions from './components/Instructions';
import Favorites from './components/Favorites';
import RadioGroup from './components/RadioGroup';

import { FavoritesInterface, RadioGroupOption } from './components/types';
import Serving from './components/Serving';

const roastOptions:RadioGroupOption[] = [
  {
    label:'light',
    value:3
  },
  {
    label:'medium',
    value:2
  },
  {
    label:'dark',
    value:1
  }
]

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

  const favorites:FavoritesInterface ={
    "daily":{
      label:"daily",
      water:280,
      ratio:16,
      brew: 245
    },
    "simple":{
      label:"simple",
      water:224,
      ratio:16,
      brew: 196
    },
    "brown":{
      label:"Alton Brown",
      water:420,
      ratio:14,
      brew: 360
    }
  }

  const [roast, setRoast] = useState(3);

  const [ratio, setRatio] = useState(16);

  const [serving, setServing] = useState(170);

  const [iced, setIced] = useState(0);
  
  const handleRoastChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setRoast(Number(event.target.value));
  }

  const handleRatioChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setRatio(Number(event.target.value));
  }

  const handleFavorite = (event:string) => {   
    setRatio(favorites[event].ratio);
    setServing(favorites[event].brew);
    setIced(0);
    setRoast(1);
  }
  
  const handleStyleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setIced(Number(event.target.value));
  }



  const calcWater = useMemo(() => {
    const RAW = serving/(1-(2/ratio))
    return Math.round((RAW + Number.EPSILON) * 100) / 100;
  },[serving, ratio])

  const calcBeans = useMemo(() => {
    const ICEDBEANS = Number(iced) ? 5 : 0;
    const RAW = calcWater / ratio;
    return (Math.round((RAW + Number.EPSILON) * 100) / 100) + ICEDBEANS;
  },[calcWater, ratio, iced])

  const calcBloom = useMemo(() => {
    const RAW = calcBeans * 2;
    return Math.round((RAW + Number.EPSILON) * 100) / 100;
  },[calcBeans])

  const handleServingChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setServing(Number(event.target.value));
  };

  const gToOz = useMemo(() => {
    const RAW = serving * .03527396;
    return Math.round((RAW + Number.EPSILON) * 100) / 100;
  },[serving])

  return (
    <main className='max-w-3xl m-auto p-2'>
    
      <Favorites updateFavorite={handleFavorite} favorites={favorites} />

      <RadioGroup
        selectedvalue={iced}
        legend="style"
        name="style"
        options={styleOptions}
        onChange={handleStyleChange}
      />

      <RadioGroup
        selectedvalue={roast}
        legend="roast"
        name="roast"
        options={roastOptions}
        onChange={handleRoastChange}
      />

      <RadioGroup
        selectedvalue={ratio}
        legend="strength"
        name="strength"
        options={strengthOptions}
        onChange={handleRatioChange}
      />

      <Serving onChange={handleServingChange} value={serving} options={brewSizeOptions}/>

      <div className='font-bold text-2xl'>
        {serving}g / {gToOz}oz
      </div>

      <Instructions
       water={calcWater}
       beans={calcBeans}
       bloom={calcBloom}
       isIced={!!Number(iced)}
       roast={roast}
      />
    </main>
  )
}

export default App
