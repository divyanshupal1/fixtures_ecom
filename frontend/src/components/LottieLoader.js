import React from 'react';
import Lottie from 'react-lottie';
import animationData from './animations/loaderanim.json';

const LottieLoader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return <><div className='preloader'>
    <Lottie options={defaultOptions} height={400} width={400} />
    </div></>;
};

export default LottieLoader;