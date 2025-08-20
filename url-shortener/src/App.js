import React from "react";
import { BrowserRouter ,Routes , Route , useParams , useNavigate }  from "react-router-dom";
import ShortenerForm from "./components/ShortenerForm";
import Startspage from "./components/Startspage";
import { getUrls } from "./storage";
import logger from "./logger";
function Redirector(){
  const { code } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    const urls = getUrls();
    const found = urls.find(u => u.shortcode === code);
    if(found){
      if(Date.now() > found.expiryTime){
        alert("Link has expired");
        navigate("/");
      }
      else{
        window.location.href = found.longUrl;
      }
    }
    else{
      alert("Shortcode not found");
      navigate("/");
    }
  }, [code, navigate]);
  return <p> Redirecting.....</p>
}
function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShortenerForm />} />
        <Route path="/stats" element={<Startspage />} />
        <Route path="/r/:code" element={<Redirector />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;