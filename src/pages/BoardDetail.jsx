import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchPostById, deletePost } from "../api/posts";
import styles from "./BoardDetail.module.css";

const BoardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchPostById(id)
      .then((res) => setPost(res.data))
      .catch((err) => {
        console.error("조회 실패:", err);
        navigate("/BoardPage");
      });
  }, [id]);

  // 비밀번호 검증 함수
  const checkPassword = async () => {
    try {
      const res = await axios.post(`/api/inquiries/${id}/check-password`, {
      password: password,
      });
      return res.data === true;
    } catch (err) {
      console.error("비밀번호 확인 중 오류:", err);
      alert("비밀번호 확인 중 서버 오류가 발생했습니다.");
      return false;
    }
  };

  // 삭제
  const handleDelete = async () => {
    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    const isMatch = await checkPassword();
    if (!isMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deletePost(post.id);
        alert("삭제되었습니다.");
        navigate("/BoardPage");
      } catch (err) {
        console.error("삭제 실패:", err);
        alert("삭제에 실패했습니다.");
      }
    }
  };

  // 수정
  const handleEdit = async () => {
  if (!password) {
    alert("비밀번호를 입력해주세요.");
    return;
  }

  const isMatch = await checkPassword();
  if (isMatch) {
    navigate(`/edit/${id}`);  
  } else {
    alert("비밀번호가 일치하지 않습니다.");
  }
};

  if (!post) return <p>로딩 중...</p>;

  return (
  <div className={styles.detailContainer}>
    
    <div className={styles.header}>
      <h2 className={styles.title}>{post.title}</h2>
      <div className={styles.meta}>
        <span className={styles.writer}>{post.writer}</span>
        <span className={styles.date}>
          {new Date(post.createdAt).toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>

    <p className={styles.content}>{post.content}</p>
    
    <div className={styles.buttonRow}>
      <input
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.passwordInput}
        required
      />
      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={handleEdit}
          className={styles.editButton}
        >
          수정
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className={styles.deleteButton}
        >
          삭제
        </button>
      </div>
    </div>

    <div className={styles.backButtonWrapper}>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className={styles.backButton}
      >
        뒤로가기
      </button>
    </div>
  </div>
);
};

export default BoardDetail;