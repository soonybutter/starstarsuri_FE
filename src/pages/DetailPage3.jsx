import React, { useState } from 'react';
import "./DetailPage3.css";

const DetailPage3 =()=>{

    // img 클릭시 확대
    const [modalImg, setModalImg] = useState(null);

    const openModal = (imgSrc)=>{
        setModalImg(imgSrc);
    };

    const closeModal =()=>{
        setModalImg(null);
    };

    const portfolioItems =[
        {
            idx:1,
            captionTitle: "도어 클로저 교체로 조용하고 부드럽게!",
            captionDesc: "현관문 닫힘 장치 안전하게 설치·교체해드립니다.",
        },
        {
            idx:2,
            captionTitle:"고장난 손잡이, 불편하게 쓰지 마세요.",
            captionDesc:"헐거운 방문 손잡이, 깔끔하게 교체해드립니다.",
        },
        {
            idx:3,
            captionTitle:"낡은 샷시는 에너지 낭비의 원인!",
            captionDesc:"깔끔한 새 샷시로 교체하세요.",
        },
    ];

    return(
        <div className="detail-wrap">
            <section className="title-content">
                <h1 className="detail-title">그 외 집 수리</h1>
                <p className="detail-desc">
                    소소하지만 불편한 집안의 고장, 저희가 책임지고 해결해드립니다.<br/>
                    디지털 도어록, 방문손잡이, 도어 클로저는 물론, 전기 스위치나 콘센트까지 — 믿고 맡겨주세요! 
                </p>
            </section>

            <div className="portfolio-grid">
                {portfolioItems.map(({idx, captionTitle, captionDesc})=>{
                    
                    const imgSrc = `images/portfolio3_${idx}.jpg`;

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

export default DetailPage3;