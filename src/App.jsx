import React, { useEffect, useState, useMemo } from "react";
import SelectNotes from "./components/SelectNotes/SelectNotes";
import NotesSection from "./components/NotesSection/NotesSection";
import "./App.css";
import AppContext from "./context/AppContext";

function App() {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal((prev) => !prev);
  
  const [hide, setHide] = useState(false);
  const [currentGroup, setCurrentGroup] = useState("");
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const noteHeadings = useMemo(() => {
    return localStorage.getItem("notes")
      ? JSON.parse(localStorage.getItem("notes"))
      : "";
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isSmallScreen);
      if (!isSmallScreen) setHide(false);
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setCurrentGroup("");
      }
    };

    
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleEscape);

  
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        modal,
        toggleModal,
        noteHeadings,
        hide,
        setHide,
        isMobile,
        setIsMobile,
        currentGroup,
        setCurrentGroup,
      }}
    >
      <div className="App">
        <SelectNotes />
        <NotesSection />
      </div>
    </AppContext.Provider>
  );
}

export default App;