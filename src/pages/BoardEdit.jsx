import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPostById, updatePost } from "../api/posts";
import styles from "./BoardEdit.module.css";

const BoardEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    writer: "",
    password:"",
  });

  useEffect(() => {
    fetchPostById(id)
      .then((res) => {
        const post = res.data;
        setFormData({
          title: post.title,
          content: post.content,
          writer: post.writer,
        });
      })
      .catch((err) => {
        console.error("조회 실패:", err);
        alert("게시글 정보를 불러오지 못했습니다.");
        navigate("/BoardPage");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await updatePost(id, formData);
    alert("게시글이 수정되었습니다.");
    navigate(`/BoardDetail/${id}`, { replace: true }); 
  } catch (error) {
    console.error("수정 실패:", error);
    alert("수정에 실패했습니다.");
  }
  };

  return (
    <div className={styles.editContainer}>
      <h2>수정하기</h2>
      <p className={styles.meta}><strong>작성자:</strong> {formData.writer}</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="제목"
          value={formData.title}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <textarea
          name="content"
          placeholder="내용"
          value={formData.content}
          onChange={handleChange}
          required
          className={styles.textarea}
        />
        <div className={styles.buttons}>
          <button type="submit" className={styles.submitButton}>수정 완료</button>
          <button type="button" className={styles.cancelButton} onClick={() => navigate(-1)}>취소</button>
        </div>
      </form>
    </div>
  );
};

export default BoardEdit;
