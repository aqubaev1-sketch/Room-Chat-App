import ChatPage from "./pages/ChatPage";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { useEffect, useState } from "react";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="h-screen w-full bg-neutral-50 dark:bg-black relative transition-colors duration-200">
      <button 
        onClick={toggleTheme} 
        className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
        aria-label="Toggle Theme"
      >
        {isDarkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
        )}
      </button>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat"  element={<ChatPage />} />
      </Routes>
    </div>
  );
};

export default App;
