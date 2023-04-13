import requests from "api/requests";
import Banner from "component/Banner";
import Footer from "component/Footer";
import Nav from "component/Nav";
import Row from "component/Row";
import { Outlet, Route, Routes } from "react-router-dom";
import DetailPage from "routes/DetailPage";
import MainPage from "routes/MainPage";
import SearchPage from "routes/SearchPage";
import "styles/App.css";

const Layout = () =>{
  return(
    <div>
    <Nav />
    <Outlet />
    <Footer />
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}> 
          <Route index element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>

      {/* 중첩 라우트로 작성
      layout이라는 컴포넌트를 만든 적이 없으므로 위에서 정의해 주기 
      Outlet이라는 것은 아래 중첩 라우트로 작성한 녀석들이 들어간다
      자식 경로 요소를 렌더링하려면 부모 경로 요소에서 아울렛을 사용해야 함
      path에 콜론이 붙으면 파람값 */}
      

    </div>
  );
}

export default App;
