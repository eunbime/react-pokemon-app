import React, { useEffect, useRef } from "react";

const BaseStat = ({ valueStat, nameStat, type }) => {
  const bg = `bg-${type}`;

  // 갑 저장 및 요소 접근
  const ref = useRef(null);

  // 초기 렌더링 시 ref 값 가져와서 사용
  useEffect(() => {
    const setValueStat = ref.current;
    const calc = valueStat * (100 / 255);
    setValueStat.style.width = calc + "%";
  }, []);

  return (
    <tr className="w-full text-white">
      <td className="px-5">{nameStat}</td>
      <td className="px-2 sm:px-3">{valueStat}</td>
      <td>
        <div
          className={`flex items-start h-2 min-w-[10rem] rounded overflow-hidden bg-gray-600 `}
        >
          <div ref={ref} className={`h-2 ${bg}`}></div>
        </div>
      </td>
      <td className="px-2 sm:px-5">255</td>
    </tr>
  );
};

export default BaseStat;
