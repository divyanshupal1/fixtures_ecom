import {
  perfumeGucci,
  ps5,
  speakers,
  womanWithHat,
} from "../../../Assets/Images/Images";
import HorizontalPoster from "../../Shared/Posters/HorizontalPoster";
import MediumPoster from "../../Shared/Posters/MediumPoster";
import SmallPoster from "../../Shared/Posters/SmallPoster";
import s from "./FeaturedSectionPosters.module.scss";
import { useGridStore } from "../../../store/useGridStore";
import { useEffect } from "react";

const FeaturedSectionPosters = () => {
  const {grid,fetchGrid} = useGridStore((state)=>({grid:state.grid,fetchGrid:state.fetchGrid}))
  
  useEffect(()=>{
    if(grid==null){
      fetchGrid()
    }
  },[])

  return (
    <div className={s.posters}>
      <MediumPoster
        title={grid?.leftImage?.title}
        description={grid?.leftImage?.description}
        posterUrl={grid?.leftImage?.imageUrl}
        url={grid?.leftImage?.buttonAction}
        textColor={grid?.leftImage?.textColor}
      />

      <div className={s.smallPosters}>
        <HorizontalPoster
          title={grid?.rightTopImage?.title}
          description={grid?.rightTopImage?.description}
          posterUrl={grid?.rightTopImage?.imageUrl}
          url={grid?.rightTopImage?.buttonAction}
          textColor={grid?.rightTopImage?.textColor}
        />

        <div className={s.smallerPosters}>
          <SmallPoster
            title={grid?.rightBottomRightImage?.title}
            description={grid?.rightBottomRightImage?.description}
            posterUrl={grid?.rightBottomRightImage?.imageUrl}
            url={grid?.rightBottomRightImage?.buttonAction}
            textColor={grid?.rightBottomRightImage?.textColor}
          />
          <SmallPoster
            title={grid?.rightBottomLeftImage?.title}
            description={grid?.rightBottomLeftImage?.description}
            posterUrl={grid?.rightBottomLeftImage?.imageUrl}
            url={grid?.rightBottomLeftImage?.buttonAction}
            textColor={grid?.rightBottomLeftImage?.textColor}
          />
        </div>
      </div>
    </div>
  );
};
export default FeaturedSectionPosters;
