import React, { useRef } from "react";
import Timer from "./TImer";

export default function Banner({ cta = "signup", test = "a", lang = "it" }) {

  const bannerRef = useRef(null);

  const checkScroll = () => {
    if (window.scrollY > 100 && bannerRef.current) {
      bannerRef.current.classList.add( 'show');
      window.removeEventListener('scroll', checkScroll);
    }
  };

  const onClickCta = (e) => {
    e.preventDefault();
  };

  return (
    <div onClick={onClickCta} className="__banner py-2 flex justify-center bg-[#43d3b0] gap-2 md:gap-8 top-[70px]" ref={bannerRef}  style={{ fontFamily: "Guillon, sans-serif" }} >
      <div className="flex flex-col md:flex-row gap-2 md:gap-12 w-auto justify-center md:justify-start items-center">
        <p className="__popup-content-subtitle text-center">
          <span className="font-semibold" dangerouslySetInnerHTML={{__html: 'Approfitta della promozione'}}></span>
          &nbsp;
          <span dangerouslySetInnerHTML={{__html: 'Regala un calendario dell\'Avvento PinAddict al prezzo migliore di sempre'}}></span>
        </p>
        <Timer />
      </div>
    </div>
  )
}