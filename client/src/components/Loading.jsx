import { useEffect, useState } from "react";
import style from "./Loading.module.css";

const Loading = () => {
  const [rainbow, setRainbow] = useState(["🌑"]);
  
  useEffect(() => {
    const moons = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];
    let moonCount = 0;
    let random = setInterval(() => {
      setRainbow(moons[moonCount % moons.length]);
      moonCount++;
    }, 100);
    return () => clearInterval(random);
  }, []);

  return <div className={style.loading}>{rainbow}</div>;
};

export default Loading;
