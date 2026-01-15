import React, { useEffect, useState } from "react";
import { fetchPosts } from "../api/posts";
import { getMe } from "../api/auth";
import { useNavigate } from "react-router-dom";
import styles from "./BoardPage.module.css";

const BoardPage = () => {
  const [posts, setPosts] = useState([]);
  const [me, setMe] = useState(null);
  const [loadingMe, setLoadingMe] = useState(true);

  const navigate = useNavigate();

  // 1) 로그인 상태 먼저 확인 (me 확인 끝난 뒤에 게시글 fetch)
  useEffect(() => {
  const run = async () => {
    setLoadingMe(true);
    try {
      const meRes = await getMe();
      setMe(meRes.data);

      const postsRes = await fetchPosts();
      setPosts(Array.isArray(postsRes.data) ? postsRes.data : []);
    } catch (e) {
      if (e?.response?.status === 401) {
        setMe(null);
        alert("로그인 후 이용할 수 있어요.");
        navigate("/");
      } else {
        console.error(e);
      }
    } finally {
      setLoadingMe(false);
    }
  };

  run();
}, [navigate]);

  // 2) 로그인 상태가 확정되면: 미로그인이면 튕기고, 로그인면 목록 가져오기
  useEffect(() => {
    if (loadingMe) return;

    if (!me) {
      alert("로그인 후 게시글을 확인할 수 있어요.");
      navigate("/");
      return;
    }

    fetchPosts()
      .then((res) => {
        if (Array.isArray(res.data)) setPosts(res.data);
        else setPosts([]);
      })
      .catch((err) => {
        // 서버에서 /api/inquiries/** 를 authenticated로 잠그면
        // 여기서 401이 뜰 수 있으니 UX 처리
        if (err?.response?.status === 401) {
          alert("세션이 만료됐어요. 다시 로그인 해주세요.");
          navigate("/");
          return;
        }
        console.log("error 발생!", err);
      });
  }, [loadingMe, me, navigate]);

  const goWrite = () => {
    if (!me) return alert("로그인 후 작성할 수 있어요.");
    navigate("/BoardWrite");
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>내 문의 내역 · CS </h1>

      <button className={styles.writeButton} onClick={goWrite}>
        문의 작성하기
      </button>

      <ul className={styles.postList}>
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id} className={styles.postItem}>
              <div
                onClick={() => navigate(`/BoardDetail/${post.id}`)}
                className={styles.postContent}
                role="button"
                tabIndex={0}
              >
                <span className={styles.postTitle}>
                  ✉{"\u00A0"}{"\u00A0"} {post.title}
                </span>
                <span className={styles.postWriter}>작성자 : {post.writer}</span>
              </div>
            </li>
          ))
        ) : (
          <li>게시글이 없습니다.</li>
        )}
      </ul>
    </div>
  );
};

export default BoardPage;
