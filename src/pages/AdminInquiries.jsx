import React, { useEffect, useMemo, useState } from "react";
import { fetchPosts, upsertReply } from "../api/posts";
import { getMe } from "../api/auth";
import { useNavigate } from "react-router-dom";
import styles from "./AdminInquiries.module.css";

const AdminInquiries = () => {
  const navigate = useNavigate();

  const [me, setMe] = useState(null);
  const [loadingMe, setLoadingMe] = useState(true);

  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState(null);

  const [reply, setReply] = useState("");
  const [saving, setSaving] = useState(false);

  // 검색/필터
  const [q, setQ] = useState("");
  const [onlyTodo, setOnlyTodo] = useState(false);

  useEffect(() => {
    setLoadingMe(true);
    getMe()
      .then((res) => setMe(res.data))
      .catch(() => setMe(null))
      .finally(() => setLoadingMe(false));
  }, []);

  useEffect(() => {
    fetchPosts()
      .then((res) => setPosts(Array.isArray(res.data) ? res.data : []))
      .catch((e) => console.error(e));
  }, []);

  const isAdmin = useMemo(() => !!me?.isAdmin, [me]);

  useEffect(() => {
    if (!loadingMe && (!me || !isAdmin)) {
      alert("사장님 계정만 접근할 수 있어요.");
      navigate("/");
    }
  }, [loadingMe, me, isAdmin, navigate]);

  const openDetail = (p) => {
    setSelected(p);
    setReply(p.reply ?? "");
  };

  // 미답변 개수(뱃지)
  const todoCount = useMemo(() => {
    return posts.filter((p) => !p.reply || !String(p.reply).trim()).length;
  }, [posts]);

  // 검색/필터 적용된 목록
  const filteredPosts = useMemo(() => {
    const keyword = q.trim().toLowerCase();

    return posts
      .filter((p) => {
        if (!onlyTodo) return true;
        return !p.reply || !String(p.reply).trim();
      })
      .filter((p) => {
        if (!keyword) return true;
        const title = (p.title ?? "").toLowerCase();
        const writer = (p.writer ?? "").toLowerCase();
        const content = (p.content ?? "").toLowerCase(); // 목록에 content 없으면 ""로 처리됨
        return title.includes(keyword) || writer.includes(keyword) || content.includes(keyword);
      });
  }, [posts, q, onlyTodo]);

  const saveReply = async () => {
    if (!selected) return;

    setSaving(true);
    try {
      // upsertReply - (id, {reply}) 형태
      const res = await upsertReply(selected.id, { reply });
      const updated = res.data;

      setPosts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      setSelected(updated);
      alert("답변이 저장되었습니다.");
    } catch (e) {
      const status = e?.response?.status;
      if (status === 401) alert("로그인이 필요합니다.");
      else if (status === 403) alert("사장님 계정만 답변할 수 있어요.");
      else alert("저장에 실패했습니다.");
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const clearSearch = () => setQ("");

  if (loadingMe) return <div className={styles.page}>로딩 중...</div>;

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <h1 className={styles.title}>문의 관리</h1>
        <button className={styles.backBtn} onClick={() => navigate(-1)} type="button">
          뒤로
        </button>
      </div>

      {/* 검색/필터 바 */}
      <div className={styles.filters}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>⌕</span>
          <input
            className={styles.searchInput}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="제목/작성자/내용 검색"
          />
          {q && (
            <button className={styles.clearBtn} onClick={clearSearch} type="button" aria-label="clear">
              ×
            </button>
          )}
        </div>

        <label className={styles.toggle}>
          <input type="checkbox" checked={onlyTodo} onChange={(e) => setOnlyTodo(e.target.checked)} />
          <span className={styles.toggleUi} />
          <span className={styles.toggleText}>미답변만</span>
          <span className={styles.toggleCount}>{todoCount}</span>
        </label>
      </div>

      <div className={styles.grid}>
        {/* 왼쪽: 리스트 */}
        <section className={styles.listCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>고객 문의</span>
            <span className={styles.badge}>{filteredPosts.length}</span>
          </div>

          <ul className={styles.list}>
            {filteredPosts.length === 0 ? (
              <li className={styles.empty}>문의가 없습니다.</li>
            ) : (
              filteredPosts.map((p) => {
                const active = selected?.id === p.id;
                const hasReply = !!p.reply?.trim();

                return (
                  <li
                    key={p.id}
                    className={`${styles.item} ${active ? styles.active : ""}`}
                    onClick={() => openDetail(p)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className={styles.itemTop}>
                      <div className={styles.itemTitle}>{p.title}</div>
                      <div className={`${styles.replyChip} ${hasReply ? styles.replyDone : styles.replyTodo}`}>
                        {hasReply ? "답변완료" : "미답변"}
                      </div>
                    </div>

                    <div className={styles.itemMeta}>
                      <span>{p.writer}</span>
                      <span className={styles.dot}>·</span>
                      <span>
                        {new Date(p.createdAt).toLocaleDateString("ko-KR", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </span>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </section>

        {/* 오른쪽: 상세 + 답변 */}
        <section className={styles.detailCard}>
          {!selected ? (
            <div className={styles.placeholder}>왼쪽에서 문의를 선택해 주세요.</div>
          ) : (
            <>
              <div className={styles.detailHeader}>
                <div className={styles.detailTitle}>{selected.title}</div>
                <div className={styles.detailMeta}>
                  <span className={styles.writer}>{selected.writer}</span>
                  <span className={styles.dot}>·</span>
                  <span>
                    {new Date(selected.createdAt).toLocaleString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              <div className={styles.contentBox}>{selected.content}</div>

              <div className={styles.replyBox}>
                <div className={styles.replyHeader}>
                  <span className={styles.replyTitle}>사장님 답변</span>
                  {selected.repliedAt && (
                    <span className={styles.replyTime}>{new Date(selected.repliedAt).toLocaleString("ko-KR")}</span>
                  )}
                </div>

                <textarea
                  className={styles.textarea}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="답변 내용을 작성해 주세요."
                  rows={6}
                />

                <div className={styles.actions}>
                  <button className={styles.saveBtn} onClick={saveReply} type="button" disabled={saving}>
                    {saving ? "저장 중..." : "답변 저장"}
                  </button>

                  <button className={styles.viewBtn} onClick={() => navigate(`/BoardDetail/${selected.id}`)} type="button">
                    게시글 보기
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminInquiries;
