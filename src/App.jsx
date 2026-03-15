import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DetailPage1 from "./pages/DetailPage1.jsx";
import DetailPage2 from "./pages/DetailPage2.jsx";
import DetailPage3 from "./pages/DetailPage3.jsx";
import BoardPage from "./pages/BoardPage.jsx";
import Home from "./pages/Home.jsx";
import BoardDetail from "./pages/BoardDetail.jsx";
import BoardWrite from "./pages/BoardWrite.jsx";
import BoardEdit from "./pages/BoardEdit.jsx";
import AdminInquiries from "./pages/AdminInquiries";

const App = () => {
  return(
    <div style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/DetailPage1" element={<DetailPage1 />} />
          <Route path="/DetailPage2" element={<DetailPage2 />}/>
          <Route path="/DetailPage3" element={<DetailPage3/>}/>
          <Route path="/BoardPage" element={<BoardPage/>}/>
          <Route path="/BoardDetail/:id" element={<BoardDetail/>}/>
          <Route path="/BoardWrite" element={<BoardWrite/>}/>
          <Route path="/edit/:id" element={<BoardEdit />} />
          <Route path="/AdminInquiries" element={<AdminInquiries />} />
        </Routes>
      </Router>
    </div>
    
  );
  
};

export default App;
