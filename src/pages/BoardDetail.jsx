import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPostById, deletePost } from "../api/posts";
import { getMe } from "../api/auth";
import styles from "./BoardDetail.module.css";

const BoardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [me, setMe] = useState(null);
  const [loadingMe, setLoadingMe] = useState(true);

  useEffect(() => {
    fetchPostById(id)
      .then((res) => setPost(res.data))
      .catch((err) => {
        const status = err?.response?.status;
        if (status === 401) {
          alert("로그인 후 글을 확인할 수 있어요.");
          navigate("/");
        } else {
          console.error("조회 실패:", err);
          navigate("/BoardPage");
        }
      });
  }, [id, navigate]);

  useEffect(() => {
    setLoadingMe(true);
    getMe()
      .then((res) => setMe(res.data))
      .catch(() => setMe(null))
      .finally(() => setLoadingMe(false));
  }, []);

  const isOwner = useMemo(() => {
    if (!me || !post) return false;
    return String(me.id) === String(post.authorId);
  }, [me, post]);

  const handleDelete = async () => {
    if (!me) return alert("로그인 후 이용할 수 있어요.");
    if (!isOwner) return alert("본인이 작성한 글만 삭제할 수 있어요.");

    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deletePost(post.id);
        alert("삭제되었습니다.");
        navigate("/BoardPage");
      } catch (err) {
        const status = err?.response?.status;
        if (status === 401) alert("로그인이 필요해요.");
        else if (status === 403) alert(err?.response?.data?.message ?? "권한이 없어요.");
        else alert("삭제에 실패했습니다.");
      }
    }
  };

  const handleEdit = () => {
    if (!me) return alert("로그인 후 이용할 수 있어요.");
    if (!isOwner) return alert("본인이 작성한 글만 수정할 수 있어요.");
    navigate(`/edit/${id}`);
  };

  if (!post) return <div className={styles.page}>로딩 중...</div>;

  const hasReply = !!post.reply?.trim();

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <h1 className={styles.pageTitle}>문의 상세</h1>
        <button type="button" className={styles.backBtn} onClick={() => navigate(-1)}>
          뒤로
        </button>
      </div>

      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.headLeft}>
            <h2 className={styles.title}>{post.title}</h2>
            <span className={`${styles.chip} ${hasReply ? styles.chipDone : styles.chipTodo}`}>
              {hasReply ? "답변완료" : "미답변"}
            </span>
          </div>

          <div className={styles.meta}>
            <span className={styles.writer}>{post.writer}</span>
            <span className={styles.dot}>·</span>
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

        <div className={styles.contentBox}>{post.content}</div>

        {/* owner일 때만 수정/삭제 */}
        {!loadingMe && isOwner && (
          <div className={styles.actions}>
            <button type="button" onClick={handleEdit} className={styles.editBtn}>
              수정
            </button>
            <button type="button" onClick={handleDelete} className={styles.deleteBtn}>
              삭제
            </button>
          </div>
        )}

        {!loadingMe && me && !isOwner && (
          <p className={styles.hint}>* 본인이 작성한 글만 수정/삭제할 수 있어요.</p>
        )}

        {/* 답변 영역 */}
        {hasReply ? (
          <div className={styles.replyBox}>
            <div className={styles.replyHeader}>
              <h3 className={styles.replyTitle}>사장 답변</h3>
              {post.repliedAt && (
                <span className={styles.replyTime}>
                  {new Date(post.repliedAt).toLocaleString("ko-KR")}
                </span>
              )}
            </div>
            <p className={styles.replyContent}>{post.reply}</p>
          </div>
        ) : (
          <div className={styles.replyEmptyBox}>* 아직 답변이 등록되지 않았습니다.</div>
        )}
      </section>
    </div>
  );
};

export default BoardDetail;