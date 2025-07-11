import React, { useEffect, useState } from "react";
import { fetchPosts, deletePost } from "../api/posts";
import { useNavigate } from "react-router-dom";
import styles from "./BoardPage.module.css";

const BoardPage =()=>{

    const [posts, setPosts] = useState([]); 
    const navigate = useNavigate();

    useEffect(()=>{
        fetchPosts()
        .then((res)=> setPosts(res.data))
        .catch((err)=> console.log("error 발생!"));
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
        <div>
            <h1 className={styles.title}>상담 및 문의  ·  CS </h1>

            <button className={styles.writeButton} onClick={()=>navigate("/BoardWrite")}>문의 작성하기</button>

            <ul className={styles.postList}>

            {posts.map((post)=>(
                <li key={post.id} className={styles.postItem}>
                    <div onClick={() => navigate(`/BoardDetail/${post.id}`)} className={styles.postContent}>
                        <span className={styles.postTitle}>✉{'\u00A0'}{'\u00A0'} {post.title}</span>
                        <span className={styles.postWriter}>작성자 : {post.writer}</span>
                    </div>
                </li>
            ))}

            </ul> 

        </div>
    );
};

export default BoardPage;