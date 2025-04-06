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
  }

  const favorites:Favorites ={
    "simple":{
      water:224,
      ratio:16
    },
    "brown":{
      water:420,
      ratio:14
    }
  }

  const [water, setVolume] = useState(224)
  const [ratio, setRatio] = useState(16)

  const handleRatioChange = (event:any) => {
    setRatio(event.target.value);
  }

  const handleVolumeChange = (event:any) => {
    setVolume(event.target.value);
  }

  const handleFavorite = (event:string) => {
    
    setRatio(favorites[event].ratio);
    setVolume(favorites[event].water);
  }
  
  const beans = useMemo(() => {
    const RAW = water / ratio;
    return Math.round((RAW + Number.EPSILON) * 100) / 100;
  },[water, ratio])

  const bloom = useMemo(() => {
    const RAW = beans * 2;
    return Math.round((RAW + Number.EPSILON) * 100) / 100;
  },[beans])

  const brewedRaw = useMemo(() => {
    const LOSS = water - bloom;
    return LOSS;
  }, [water, beans])

  const brewedGr = useMemo(() => {
    return Math.round((brewedRaw + Number.EPSILON) * 100) / 100;
  },[brewedRaw])

  const brewedOz = useMemo(() => {
    const toOz = brewedRaw * .03527396;
    return Math.round((toOz + Number.EPSILON) * 100) / 100;
  },[brewedRaw])

  return (
    <main>
    
      <Favorites use_favorite ={handleFavorite} />

      <Strength onChange={handleRatioChange}/>

      <Water
        type="number"
        label={`Water (g)`}
        name="w"
        value={water}
        onChange={handleVolumeChange}
        max={800}
      />
      <dl>
        <dt>approximate brew size</dt>
        <dd>{brewedOz}oz | {brewedGr}gr</dd>
      </dl>


      <Instructions
       water={water}
       beans={beans}
       bloom={bloom}
      />
    </main>
  )
}

export default App
