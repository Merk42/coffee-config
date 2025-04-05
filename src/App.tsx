import { useMemo, useState } from 'react';
import Water from './components/Water';
import './App.css';
import Instructions from './components/Instructions';
import Strength from './components/Strength';

import Favorites from './components/Favorites';

/*
  g to oz
  g * .03527396

  beans
  volume / ratio

  bloom
  beans * 2


  hsl(19deg, 71.6%, 14%)
*/
function App() {

  interface Favorites {
    [key:string]: Favorite;
  }

  interface Favorite {
    volume: number;
    ratio: number;
  }

  const favorites:Favorites ={
    "simple":{
      volume:224,
      ratio:16
    },
    "brown":{
      volume:420,
      ratio:14
    }
  }

  const [volume, setVolume] = useState(224)
  const [ratio, setRatio] = useState(16)

  const handleRatioChange = (event:any) => {
    setRatio(event.target.value);
  }

  const handleVolumeChange = (event:any) => {
    setVolume(event.target.value);
  }

  const handleFavorite = (event:string) => {
    
    setRatio(favorites[event].ratio);
    setVolume(favorites[event].volume);
  }
  
  const beans = useMemo(() => {
    const RAW = volume / ratio;
    return Math.round((RAW + Number.EPSILON) * 100) / 100;
  },[volume, ratio])

  const bloom = useMemo(() => {
    const RAW = beans * 2;
    return Math.round((RAW + Number.EPSILON) * 100) / 100;
  },[beans])

  const volumeRaw = useMemo(() => {
    const LOSS = volume - bloom;
    return LOSS;
  }, [volume, beans])

  const volumeGr = useMemo(() => {
    return Math.round((volumeRaw + Number.EPSILON) * 100) / 100;
  },[volumeRaw])

  const volumeOz = useMemo(() => {
    const toOz = volumeRaw * .03527396;
    return Math.round((toOz + Number.EPSILON) * 100) / 100;
  },[volumeRaw])

  return (
    <main>
    
      <Favorites use_favorite ={handleFavorite} />

      <Strength onChange={handleRatioChange}/>

      <Water
        type="number"
        label={`Water (g)`}
        name="w"
        value={volume}
        onChange={handleVolumeChange}
        max={800}
      />

{/*
TODO factor in 'water loss'
During a Chemex pour-over, for a typical 1:16 coffee-to-water ratio, you'd lose about 16 grams of water for every 1 gram of coffee used, as the water is absorbed into the coffee grounds and filter
*/}
      <dl>
        <dt>approximate brew size</dt>
        <dd>{volumeOz}oz | {volumeGr}gr</dd>
      </dl>


      <Instructions
       volume={volume}
       beans={beans}
       bloom={bloom}
      />
    </main>
  )
}

export default App
