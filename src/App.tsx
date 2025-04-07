import { useMemo, useState } from 'react';
import Water from './components/Water';
import './App.css';
import Instructions from './components/Instructions';
import Strength from './components/Strength';
import Favorites from './components/Favorites';
import Cups from './components/Cups';

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

  const [serving, setServing] = useState(0)

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
      <Cups onChange={handleServingChange}/>

{/*

      <Water
        type="number"
        label={`Water (g)`}
        name="w"
        value={water}
        onChange={handleVolumeChange}
        max={800}
      />
      */}
      {/*
      <dl>
        <dt>approximate brew size</dt>
        <dd>{brewedOz}oz | {brewedGr}gr</dd>
      </dl>
      */}
      {/*
      {serving}g
      */}
      

      <Instructions
       water={calcWater}
       beans={calcBeans}
       bloom={calcBloom}
      />
    </main>
  )
}

export default App
