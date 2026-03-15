import React, { useState } from "react";
import "./DetailPage1.css"; 

const DetailPage1 = () => {
  
  // img 클릭시 확대 기능
  const [modalImg, setModalImg] = useState(null);

  const openModal = (imgSrc) =>{
    setModalImg(imgSrc);
  };

  const closeModal = () =>{
    setModalImg(null);
  };


  const portfolioItems = [
    {
      idx: 1,
      captionTitle: "세면대 교체",
      captionDesc: "노후된 세면대를 교체하고 실리콘 마감을 새로 시공했습니다.",
    },
    {
      idx: 2,
      captionTitle: "욕실 리모델링",
      captionDesc: " 노후된 수도꼭지, 호스를 교체하고 실리콘으로 마감했습니다.",
    },
  ];
  

  return (
    <div className="detail-wrap">
      <section className="title-content">
        <h1 className="detail-title">욕실 · 배수관 작업 </h1>
        <p className="detail-desc">
          욕실, 배수관, 변기, 세면대, 수전, 샤워기 등 다양한 욕실 수리 서비스를 제공합니다.<br />
          시멘트 및 실리콘 보수, 양변기 설치, 비데 장착 등도 가능합니다.
        </p>
      </section>

      <div className="portfolio-grid">
        {portfolioItems.map(({ idx, captionTitle, captionDesc})=>{
          const imgSrc = `images/portfolio1_${idx}.jpg`;

          return(
            <div className="portfolio-item" key={idx} onClick={()=> openModal(imgSrc)}>
              <img src={imgSrc} alt={`작업 사진 ${idx}`} className="portfolio-img"/>
              <div className="portfolio-caption">
                <strong>{captionTitle}</strong>
                <p>{captionDesc}</p>
              </div>
            </div>  
          );
          })}
          
      </div>  

      {modalImg && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e)=> e.stopPropagation()}>
            <img src={modalImg} alt="확대 이미지" className="modal-img" />
            <button className="modal-close" onClick={closeModal}>x</button>
          </div>

        </div>
      )}
    </div>
  );
};

export default DetailPage1;