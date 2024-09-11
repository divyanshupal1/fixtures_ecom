import {Input} from "@/components/ui/input";
import {FiUploadCloud} from "react-icons/fi";

const ImageSelector = ({
    image,
    multiple = false,
    onChange,
    scale,
    disabled = false,
    imgRef
  }: {
    multiple?: boolean;
    image: string;
    onChange?: (i: File | null | undefined|string) => void;
    scale: number;
    disabled?: boolean;
    imgRef?: React.RefObject<HTMLInputElement>;
  }) => {
    console.log(image,"image")
  
    return (
      <div className="w-full h-full border-border overflow-hidden flex flex-col gap-y-6 justify-center items-center relative border-4 border-dotted rounded-xl">
        {!disabled && <Input
          ref={imgRef}
          type="file"
          accept="image/png, image/jpeg"
          className="h-full w-full opacity-0 absolute z-10"
          onChange={(e) => {
            onChange && onChange(e.target.files?.item(0));
          }}
        />}
        {image ? (
          <ImagePreview image={image} border={false} />
        ) : (
          <InputImagePlaceholder scale={scale} />
        )}
      </div>
    );
  };
  
  const ImagePreview = ({
    image,
    border = true,
  }: {
    image: string;
    border?: boolean;
  }) => {
    console.log(typeof image, " img");
    return (
      <div
        className={`w-full h-full ${
          border ? "border-4 border-border border-dotted rounded-xl p-1" : ""
        }`}
      >
        {typeof image == "string" && (
          <img src={image} alt="Main Image" className="w-full h-full" />
        )}
      </div>
    );
  };
  const InputImagePlaceholder = ({ scale }: { scale?: number }) => {
    return (
      <>
        <div className={`scale-[${scale}]`}>
          <FiUploadCloud />
        </div>
        <p className="w-1/2 text-center">Drag and drop or click to upload</p>
      </>
    );
  };

export default ImageSelector;