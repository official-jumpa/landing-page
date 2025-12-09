import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/ui/layout";
import { Landing, } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        {/* Shared layout (Navbar + Footer are inside Layout) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Landing/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
