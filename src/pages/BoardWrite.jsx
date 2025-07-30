import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./BoardWrite.css";

const BoardWrite = ()=>{
    const navigate = useNavigate();
    const [ form, setForm ] = useState({
        title:"",
        writer:"",
        content: "",
        password:"",
    });

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setForm((prev)=>({
            ...prev,
            [name]:value,
        }));
    };

    const handleSubmit = (e)=>{
        e.preventDefault();

        axios.post("/api/inquiries", form)
        .then((res) => {
            alert("문의가 등록되었습니다.");
            navigate("/BoardPage");
        })
        .catch((err) => {
            alert("등록 중 오류가 발생했습니다.");
            console.error(err);
        });

    };


    return (
    <div className="board-write">
      <h2>상담/문의 작성하기</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목</label><br />
          <input type="text" name="title" placeholder="제목을 입력하세요" value={form.title} onChange={handleChange} required />
        </div>
        <div>
          <label>작성자</label><br />
          <input type="text" name="writer"  placeholder="이름" value={form.writer} onChange={handleChange} required />
        </div>
        <div>
          <label>내용</label><br />
          <textarea name="content" value={form.content} onChange={handleChange} rows="6" placeholder="문의 내용을 작성해주세요."required />
        </div>
        <input
          type="password"
          name="password" 
          placeholder="비밀번호 입력"
          value={form.password}
          onChange={handleChange}
          required
        />
        <div className="button-group">
          <button type="submit" className="submit">등록</button>
          <button type="button" className="cancel" onClick={() => navigate(-1)}>취소</button>
        </div>
      </form>
    </div>
  );
};

export default BoardWrite;