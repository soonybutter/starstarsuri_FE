import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/posts";
import { getMe } from "../api/auth";
import "./BoardWrite.css";

const BoardWrite = () => {
  const navigate = useNavigate();

  const [me, setMe] = useState(null);
  const [loadingMe, setLoadingMe] = useState(true);

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    setLoadingMe(true);
    getMe()
      .then((res) => setMe(res.data))
      .catch(() => setMe(null))
      .finally(() => setLoadingMe(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!me) {
      alert("로그인 후 작성할 수 있어요.");
      return;
    }

    try {
      await createPost(form); // title/content만
      alert("문의가 등록되었습니다.");
      navigate("/BoardPage");
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401) {
        alert("로그인 후 작성할 수 있어요.");
        navigate("/");
      } else {
        console.error(err);
        alert("등록에 실패했습니다.");
      }
    }
  };

  return (
    <div className="board-write">
      <h2>상담/문의 작성하기</h2>

      {!loadingMe && !me && (
        <p style={{ marginBottom: 12 }}>로그인 후 작성할 수 있어요.</p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>제목</label><br />
          <input
            type="text"
            name="title"
            placeholder="제목을 입력하세요"
            value={form.title}
            onChange={handleChange}
            required
            disabled={!me && !loadingMe}
          />
        </div>

        <div>
          <label>내용</label><br />
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows="6"
            placeholder="문의 내용을 작성해주세요."
            required
            disabled={!me && !loadingMe}
          />
        </div>

        <div className="button-group">
          <button type="button" className="cancel" onClick={() => navigate(-1)}>
            취소
          </button>
          <button type="submit" className="submit" disabled={!me && !loadingMe}>
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default BoardWrite;
