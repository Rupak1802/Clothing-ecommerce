import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component that instantly scrolls window to (0, 0)
 * on every route change, preventing pages from retaining scroll position
 * or smoothly animating up from the bottom.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly reset scroll to top without smooth scrolling animation from bottom
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}
