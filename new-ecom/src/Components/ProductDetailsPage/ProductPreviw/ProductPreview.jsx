import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { updateState } from "../../../Features/globalSlice";
import s from "./ProductPreview.module.scss";

const ProductPreview = ({ data, handleZoomInEffect, setOptions, previewImg }) => {
  const { mainImage, name, subImages } = data;

  // Combine the cover image with the subImages array
  const allImages = [mainImage, ...(subImages || [])];
  
  const hasOtherImages = allImages.length > 1;

  function setZoomInPreview(value = false) {
    setOptions((prev) => ({ ...prev, isZoomInPreviewActive: value }));
  }

  function setPreviewImg(img) {
    setOptions((prev) => ({ ...prev, previewImg: img }));
  }

  return (
    <section className={s.images}>
      {hasOtherImages && (
        <PreviewImages data={allImages} setPreviewImg={setPreviewImg} />
      )}

      <div className={s.previewImgHolder}>
        <img
          src={previewImg}
          alt={name}
          onMouseMove={handleZoomInEffect}
          onMouseEnter={() => setZoomInPreview(true)}
          onMouseLeave={() => setZoomInPreview(false)}
        />
      </div>
    </section>
  );
};
export default ProductPreview;

const PreviewImages = ({ data, setPreviewImg }) => {
  return (
    <div className={s.otherImages}>
      {data.map((img, i) => (
        <div
          key={i}
          className={s.imgHolder}
          onClick={() => setPreviewImg(img)}
        >
          <img src={img} alt={`product's image ${i + 1}`} />
        </div>
      ))}
    </div>
  );
};
