import { useMemo, useState } from 'react'
import Input from './components/Input'
import './App.css'
import Instructions from './components/Instructions';
import Strength from './components/Strength';

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

  const volumeOz = useMemo(() => {
    return volume  * .03527396
  },[volume])

  return (
    <>
    

      <button onClick={() => {handleFavorite('simple')}}>simple</button>
      <button onClick={() => {handleFavorite('brown')}}>AB</button>


    
      <Input
        type="range"
        label={`ratio (1:${ratio})`}
        name="ratio"
        value={ratio}
        onChange={handleRatioChange}
        min={14}
        max={18}
        step={1}
      />
      <Strength/>

      <Input
        type="number"
        label={`drink mass (g)`}
        name="ratio"
        value={volume}
        onChange={handleVolumeChange}
      />

      <dl>
        <dt>drink volume (oz)</dt>
        <dd>{volumeOz}</dd>
      </dl>


      <Instructions
       volume={volume}
       beans={beans}
       bloom={bloom}
      />
    </>
  )
}

export default App
