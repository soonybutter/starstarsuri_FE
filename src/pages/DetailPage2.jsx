import React, { useState } from 'react';
import "./DetailPage2.css";

const DetailPage2 =()=>{

    // img 클릭시 확대 기능
    const [modalImg, setModalImg ] = useState(null);

    const openModal =(imgSrc)=>{
        setModalImg(imgSrc);
    };

    const closeModal =()=>{
        setModalImg(null);
    };

    const portfolioItems =[
      {
        idx:1,
        captionTitle: "주방 싱크대 리모델링",
        captionDesc: "노후된 싱크대를 교체하고, 주방 인테리어를 새로 시공했습니다.",
      },
      {
        idx:2,
        captionTitle: "주방 싱크대",
        captionDesc: "고장난 수전을 교체하고, 막힌 배수구도 교체 했습니다.",
      },
    ];

    return(
        <div className="detail-wrap">
            <section className="title-content">
                <h1 className="detail-title">주방 · 싱크대 및 배수구 </h1>
                <p className="detail-desc">
                    싱크대 수전부터 배수구, 경첩, 렌지후드, 세탁기 수도꼭지까지<br/>
                    주방의 불편함을 빠르게 해결해드립니다.
                </p>
            </section>

            <div className="portfolio-grid">
                {portfolioItems.map(({idx, captionTitle, captionDesc})=>{
                    
                    const imgSrc = `images/portfolio2_${idx}.jpg`;
                    
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

            {modalImg &&(
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e)=> e.stopPropagation()}>
                        <img src={modalImg} alt="확대 이미지" className="modal-img"/>
                        <button className="modal-close" onClick={closeModal}>x</button>
                    </div>

                </div>
            )}
        </div>
    );
};

export default DetailPage2;


