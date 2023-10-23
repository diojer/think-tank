import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const elements = document.getElementsByTagName("input");
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].type === "radio") {
        elements[i].checked = false;
      }
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
