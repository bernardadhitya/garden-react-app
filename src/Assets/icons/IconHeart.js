import * as React from "react"

function IconHeart(props) {
  const { size } = props;
  return (
    <svg
      width={size || 20}
      height={size || 20}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.422 3.431a4.065 4.065 0 00-.89-1.293A4.146 4.146 0 009.62.954 4.173 4.173 0 007 1.876 4.173 4.173 0 004.38.954a4.146 4.146 0 00-2.913 1.184A4.038 4.038 0 00.25 5.023c0 .52.106 1.063.317 1.615.177.46.43.939.753 1.421.513.764 1.218 1.561 2.093 2.37a23.385 23.385 0 002.946 2.3l.37.238a.502.502 0 00.54 0l.37-.237a23.69 23.69 0 002.947-2.302c.875-.808 1.58-1.605 2.092-2.369.324-.482.578-.96.753-1.421a4.52 4.52 0 00.317-1.615 3.977 3.977 0 00-.326-1.592zM7 11.731S1.437 8.167 1.437 5.023c0-1.592 1.318-2.882 2.943-2.882A2.95 2.95 0 017 3.709a2.95 2.95 0 012.62-1.568c1.625 0 2.943 1.29 2.943 2.882C12.563 8.167 7 11.731 7 11.731z"
        fill="#FF4133"
      />
    </svg>
  )
}

export default IconHeart;
