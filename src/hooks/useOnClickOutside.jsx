import { useEffect } from "react";

export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // 모달 안을 클릭했을 때
      if (!ref.current || ref.current.contains(event.target)) {
        // 타겟이 안을 포함하는지 (contains)
        return;
      }
      // 모달 밖을 클릭했을 때
      handler();
    };
    document.addEventListener("mousedown", listener);

    // clean up
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
}
