import React, { useEffect, useState  } from "react";
import { getMe, logout } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "../App.css";
import api from "../api/posts";

const Home =()=>{
    const navigate = useNavigate();
    const [me, setMe] = useState(null);
    const [loadingMe, setLoadingMe] = useState(true);

    const handleMoreClick = (idx)=>{
        if(idx === 0){
          navigate("/DetailPage1");
        }
        if(idx ===1){
          navigate("/DetailPage2");
        }
        else if(idx===2){
          navigate("/DetailPage3");
        }
        
    };

     // 로그인 상태 확인
    const checkMe = async () => {
      setLoadingMe(true);
      try {
        const res = await getMe();
        setMe(res.data);
      } catch (e) {
        if (e?.response?.status === 401) {
          setMe(null);
        } else {
          console.error(e);
          setMe(null);
        }
      } finally {
        setLoadingMe(false);
      }
    };

    const base = import.meta.env.VITE_API_BASE || "http://localhost:8080";

    // 카카오 로그인 시작 (백엔드로 보내서 OAuth 시작)
    const startKakaoLogin = () => {
      const base = import.meta.env.VITE_API_BASE || "http://localhost:8080";
      window.location.href = `${base}/oauth2/authorization/kakao`;
    };

    const handleLogout = async () => {
      try {
          await logout();
        } catch (e) {
          console.error(e);
        } finally {
          setMe(null);
          // 혹시 세션 반영이 느리면 한 번 더 확인
          checkMe();
      }
    };


    useEffect(()=>{
    
        checkMe();

        const sections = document.querySelectorAll(".section");
    
        const handleScroll = () => {
          sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const inView = rect.top < window.innerHeight - 100 && rect.bottom > 100;
      
            section.classList.toggle("show", inView);

            });
        };
       
        const introH1 = document.querySelector(".intro_text > h1");
        
        introH1?.classList.add("show");
    
        window.addEventListener("scroll", handleScroll);
        handleScroll();
    
        return ()=>{
          window.removeEventListener("scroll", handleScroll);
        }
    },[]);

    return (
      <div className="wrap">
        <div className="intro_bg">
          <header className="header" id="link_header">
            <ul className="nav">
              <li><a href="#link_header">HOME</a></li>
              <li><a href="#link_about">ABOUT</a></li>
              <li><a href="#link_service">SERVICE</a></li>
              <li><a href="#link_customer_service">CONTACT</a></li>
            </ul>
            {/* 로그인 영역 */}

            <div className="authBox">

              {me?.isAdmin && (
              <button
                className="authBtn authBtnGhost"
                onClick={() => navigate("/AdminInquiries")}
              >
                문의 관리
              </button>
            )}
              {loadingMe ? (
                <div className="authSkeleton" />
              ) : me ? (
                <div className="authLoggedIn">
                  <div className="authProfile">
                    <div className="authAvatar">
                      {(me.nickname ?? me.username ?? "U").slice(0, 1)}
                    </div>
                    <span className="authName">{me.nickname ?? me.username}님</span>
                  </div>

                  <button className="authBtn authBtnGhost" onClick={handleLogout}>
                    로그아웃
                  </button>
                </div>
              ) : (
                <button className="authBtn authBtnKakao" onClick={startKakaoLogin}>
                  카카오로 시작하기
                </button>
              )}
            </div>
            
            
          </header>
          

        <div className="intro_text" id="link_header">
          <h1>별별 집수리</h1>
          <h5>
            전문 집수리&nbsp;&nbsp;·&nbsp;&nbsp;출장 집수리 ·&nbsp;&nbsp;화장실 ·&nbsp;&nbsp;도어록
            ·&nbsp;&nbsp;방충망 등
          </h5>
        </div>
      </div>

      <ul className="amount">
        <li>
          <div className="content1"
                onClick={()=>{
                window.open("https://www.daangn.com/kr/local-profile/%EB%B3%84%EB%B3%84-%EC%A7%91%EC%88%98%EB%A6%AC-ntixjet9u48x/?in=%EC%84%9C%EC%8B%A0%EB%8F%99-2499","_blank")
                }}>당근마켓 ‘별별집수리’</div>
        </li>
        <li>
          <div className="content1"
                onClick={()=>{
                window.open("https://blog.naver.com/starstar1999","_blank")
                }}>네이버 블로그 ‘별별집수리’</div>
        </li>
        <li>
          <div className="content1"
                onClick={()=>{
                navigate("/BoardPage");
                }}>문의게시판</div>
        </li>
        <li>
          <div className="content1"
                onClick={()=>{
                const element = document.getElementById("link_customer_service");
                if(element){
                  element.scrollIntoView({behavior: "smooth"});   
                }
                }} >상담 및 문의 </div>
        </li>
      </ul>

      <section className="main_text0 section" id="link_about">
        <h1>ABOUT</h1>
        <div className="contents1"> 빠르게, 정확하게, 전문가의 손길로 </div>

        <ul className="icons">
          {[
            {
              title: "욕실 · 배수관",
              content: "변기 · 세면대 · 수전 · 샤워기 · 폽업 · 배수구 · 환풍기 · 배관, 수전 교체 · 변기 시멘트 및 실리콘 · 비데 · 양변기 시공"
            },
            {
              title: "주방 싱크대 및 배수구",
              content: "싱크대 수전 · 배수구 · 가구 경첩 · 렌지후드 · 세탁기용 수도꼭지"
            },
            {
              title: "그 외 집 수리",
              content: "디지털 도어록 · 보조키 · 방문손잡이 · 이중안전고리 ·도어 클로저 · 힌지 각종 등기구 · 콘센트 · 스위치 등"
            }
          ].map((item, idx) => (
            <li key={idx}>
              <div className="about_box">
                <div className="contents1_bold">{item.title}</div>
                <div className="contents3">{item.content}</div>
              </div>

              <div className="more" onClick={()=>
                handleMoreClick(idx)
              }>MORE</div>
            </li>
          ))}
        </ul>
      </section>

      <section className="main_text1 section" id="link_service">
        <h1>SERVICE</h1>
        <div className="contents1">전문가의 손길로, 못 하나도 정성을 다합니다.</div>
        <div className="service">
          {["carrot4.png", "carrot5.png", "carrot3.png"].map((src, idx) => (
            <div key={idx} className={`photo${idx + 1}`}>
              <img src={`images/${src}`} height="450px" width="420px" alt="service" />
            </div>
          ))}
        </div>
      </section>

      <section className="main_text2 section" id="link_customer_service">
        <ul>
          <li>
            <div className="main_text2_title"><h1>CUSTOMER SERVICE </h1></div>
            <div className="inquiry_button"
                  onClick={()=>{
                  navigate("/BoardPage");
                  }}>견적 및 상담 문의</div>
          </li>
        </ul>
      </section>

      <footer>
        <div className="footer_text">
          CEO. 조 현 성 <br />
          Addr. 전북 김제시 서암동 <br />
          Tel. 000 - 0000 -0000 <br />
          COPYRIGHT 2026. SOON & JUNE. ALL RIGHT RESERVED.
        </div>
      </footer>
    </div>
  );

};

export default Home;