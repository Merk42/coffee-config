import { useMemo, useState } from 'react';
import './App.css';
import Instructions from './components/Instructions';
import Strength from './components/Strength';
import Favorites from './components/Favorites';
import BrewSizes from './components/BrewSizes';

/*
  g to oz
  g * .03527396

  beans
  water / ratio

  bloom
  beans * 2


  hsl(19deg, 71.6%, 14%)
*/
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

  return (
    <main>
    
      <Favorites use_favorite ={handleFavorite} />

      <Strength onChange={handleRatioChange}/>
      <BrewSizes onChange={handleServingChange}/>

      <Instructions
       water={calcWater}
       beans={calcBeans}
       bloom={calcBloom}
      />
    </main>
  )
}

export default App
