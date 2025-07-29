import React, { useEffect, useState } from "react";
import { fetchPosts, deletePost } from "../api/posts";
import { useNavigate } from "react-router-dom";
import styles from "./BoardPage.module.css";

const BoardPage =()=>{

    const [posts, setPosts] = useState([]); 
    const navigate = useNavigate();

    useEffect(()=>{
        console.log("useEffect 실행됨.");
        fetchPosts()
        .then((res)=> {
            console.log("응답 데이터 확인: ", res.data);
            if (Array.isArray(res.data)) {
            setPosts(res.data);
            } else {
                console.error("응답 데이터가 배열이 아닙니다!", res.data);
                setPosts([]);
            }
        })
        .catch((err)=> console.log("error 발생!",err));
    },[]);

    const handleDelete = (id) =>{
        if(window.confirm("정말 삭제하시겠습니까?")){
            deletePost(id)
            .then(()=>{
                setPosts((prev)=> prev.filter((post)=>post.id !== id));
            })
            .catch((err)=> console.log("삭제 실패:",err));
        }
    };


    return(
        <div className={styles.pageContainer}>
            <h1 className={styles.title}>상담 및 문의  ·  CS </h1>

            <button className={styles.writeButton} onClick={()=>navigate("/BoardWrite")}>문의 작성하기</button>

            <ul className={styles.postList}>
        
            {Array.isArray(posts) ? (
                posts.map((post) => (
                    <li key={post.id} className={styles.postItem}>
                        <div onClick={() => navigate(`/BoardDetail/${post.id}`)} className={styles.postContent}>
                            <span className={styles.postTitle}>✉{'\u00A0'}{'\u00A0'} {post.title}</span>
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