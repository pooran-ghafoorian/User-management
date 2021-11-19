import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFoundPage } from "./pages/NotFoundPage";
import { UserPage } from "./pages/UserPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UserPage />} />
      <Route path="/users" element={<UserPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
