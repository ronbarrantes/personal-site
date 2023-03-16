import React from 'react'

interface ReactProps extends React.SVGAttributes<SVGElement> {
  children?: never
  color?: string
}

export const React = (props: ReactProps) => (
  <svg
    width="45"
    height="40"
    viewBox="0 0 45 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M36.9646 12.9647C36.4983 12.8042 36.015 12.6523 35.5174 12.5087C35.5992 12.1749 35.6742 11.8454 35.741 11.5216C36.8365 6.20368 36.1202 1.91955 33.6743 0.509027C31.3289 -0.843474 27.4932 0.566725 23.6194 3.93802C23.2468 4.2622 22.8733 4.60542 22.4999 4.96514C22.2511 4.72714 22.0027 4.49715 21.7549 4.27716C17.695 0.672358 13.6256 -0.846755 11.182 0.567845C8.83891 1.92427 8.14502 5.95176 9.13117 10.9916C9.22639 11.4784 9.33771 11.9755 9.46359 12.4809C8.88765 12.6444 8.33164 12.8187 7.79963 13.0041C3.03983 14.6636 0 17.2644 0 19.9621C0 22.7484 3.26326 25.543 8.22096 27.2375C8.6122 27.3712 9.01817 27.4977 9.43654 27.6177C9.30074 28.1644 9.18262 28.7001 9.08347 29.2225C8.14318 34.1749 8.87749 38.1072 11.2144 39.4551C13.6282 40.847 17.6792 39.4163 21.6239 35.9682C21.9356 35.6956 22.2485 35.4065 22.562 35.1036C22.9683 35.4948 23.3739 35.8651 23.7774 36.2124C27.5983 39.5004 31.372 40.8281 33.7067 39.4764C36.1181 38.0805 36.9018 33.8562 35.8844 28.7167C35.8067 28.3242 35.7162 27.9232 35.6147 27.515C35.8992 27.4309 36.1785 27.3441 36.4508 27.2538C41.6048 25.5462 44.9582 22.7856 44.9582 19.9621C44.9582 17.2546 41.8203 14.6363 36.9646 12.9647ZM35.8468 25.4308C35.6009 25.5122 35.3487 25.5908 35.0917 25.6671C34.5227 23.8658 33.7548 21.9504 32.815 19.9715C33.7118 18.0397 34.45 16.1488 35.0031 14.3592C35.463 14.4923 35.9093 14.6326 36.3395 14.7808C40.4998 16.213 43.0376 18.3305 43.0376 19.9621C43.0376 21.7001 40.2969 23.9563 35.8468 25.4308ZM34.0003 29.0897C34.4502 31.3623 34.5144 33.417 34.2164 35.0233C33.9487 36.4666 33.4102 37.4289 32.7444 37.8143C31.3275 38.6344 28.2976 37.5684 25.03 34.7565C24.6554 34.4342 24.278 34.09 23.8995 33.7257C25.1663 32.3402 26.4324 30.7296 27.6681 28.9408C29.8415 28.7479 31.8948 28.4326 33.7569 28.0022C33.8486 28.3721 33.9301 28.7349 34.0003 29.0897ZM15.3273 37.6726C13.943 38.1615 12.8405 38.1755 12.174 37.7912C10.7559 36.9733 10.1664 33.816 10.9705 29.5807C11.0626 29.0957 11.1723 28.5975 11.2986 28.0882C13.1403 28.4954 15.1786 28.7885 17.3572 28.9651C18.6012 30.7155 19.9039 32.3244 21.2166 33.7331C20.9298 34.01 20.6441 34.2736 20.36 34.522C18.6157 36.0467 16.8677 37.1285 15.3273 37.6726ZM8.84211 25.4201C6.64991 24.6709 4.83951 23.6971 3.59856 22.6344C2.48349 21.6795 1.92052 20.7314 1.92052 19.9621C1.92052 18.3251 4.3612 16.237 8.43183 14.8177C8.92574 14.6455 9.44278 14.4832 9.97935 14.3308C10.5419 16.1608 11.2799 18.0741 12.1705 20.0089C11.2684 21.9724 10.5199 23.9162 9.95182 25.7676C9.5693 25.6577 9.19871 25.5419 8.84211 25.4201ZM11.016 10.6227C10.1711 6.30475 10.7322 3.04742 12.1443 2.23004C13.6483 1.35929 16.9742 2.6008 20.4797 5.71337C20.7037 5.91231 20.9287 6.12054 21.1543 6.33596C19.848 7.73856 18.5573 9.33538 17.3244 11.0754C15.2099 11.2714 13.1859 11.5862 11.325 12.0078C11.2081 11.5372 11.1044 11.0748 11.016 10.6227ZM30.4089 15.4114C29.9641 14.643 29.5074 13.8927 29.0418 13.163C30.4762 13.3443 31.8506 13.585 33.1412 13.8796C32.7537 15.1214 32.2708 16.4198 31.7023 17.7509C31.2945 16.9766 30.8631 16.196 30.4089 15.4114ZM22.5005 7.70855C23.3864 8.66829 24.2736 9.73982 25.1462 10.9024C24.2668 10.8609 23.3766 10.8393 22.4791 10.8393C21.59 10.8393 20.7064 10.8604 19.8325 10.9012C20.706 9.74943 21.6008 8.67933 22.5005 7.70855ZM14.5415 15.4246C14.0971 16.1952 13.6738 16.9716 13.2724 17.7494C12.7131 16.423 12.2346 15.1187 11.8438 13.8593C13.1265 13.5722 14.4944 13.3375 15.9197 13.1596C15.4475 13.8961 14.9871 14.652 14.5415 15.4246ZM15.9607 26.9016C14.4881 26.7374 13.0997 26.5147 11.8173 26.2356C12.2144 24.9537 12.7034 23.6215 13.2745 22.2665C13.677 23.0438 14.102 23.8205 14.5491 24.5928C15.0045 25.3795 15.4764 26.1501 15.9607 26.9016ZM22.5537 32.3511C21.6434 31.369 20.7354 30.2825 19.8487 29.1139C20.7095 29.1477 21.5871 29.165 22.4791 29.165C23.3954 29.165 24.3013 29.1443 25.193 29.1047C24.3175 30.2943 23.4335 31.3824 22.5537 32.3511ZM31.7206 22.1975C32.3215 23.5671 32.8281 24.8923 33.2303 26.1524C31.9267 26.4497 30.5193 26.6893 29.0365 26.8672C29.5032 26.1276 29.9639 25.3645 30.4166 24.5796C30.8746 23.7854 31.3094 22.99 31.7206 22.1975ZM28.753 23.6201C28.0502 24.8386 27.3287 26.0019 26.5962 27.0999C25.2621 27.1953 23.8838 27.2444 22.4791 27.2444C21.08 27.2444 19.7191 27.2009 18.4086 27.1159C17.6466 26.0034 16.9094 24.8368 16.2111 23.6306C15.5147 22.4276 14.8738 21.2145 14.293 20.0082C14.8737 18.7991 15.513 17.5847 16.2054 16.3839L16.2053 16.3841C16.8996 15.1802 17.6303 14.0192 18.3852 12.9137C19.7223 12.8126 21.0934 12.7599 22.479 12.7599C23.8709 12.7599 25.2438 12.813 26.5804 12.915C27.3239 14.0124 28.0496 15.1696 28.7466 16.3737C29.4516 17.5914 30.0991 18.7978 30.6848 19.9809C30.1009 21.1844 29.4548 22.403 28.753 23.6201ZM32.7149 2.17291C34.2204 3.0411 34.8059 6.54251 33.86 11.1339C33.7997 11.4269 33.7317 11.7253 33.6579 12.0277C31.7927 11.5974 29.7673 11.2771 27.6467 11.0782C26.4113 9.31897 25.1312 7.71967 23.8462 6.33508C24.1917 6.00274 24.5367 5.68584 24.8802 5.38679C28.1993 2.49829 31.3015 1.35785 32.7149 2.17291ZM22.4791 15.9475C24.6963 15.9475 26.4937 17.7449 26.4937 19.9621C26.4937 22.1793 24.6963 23.9767 22.4791 23.9767C20.2619 23.9767 18.4645 22.1793 18.4645 19.9621C18.4645 17.7449 20.2619 15.9475 22.4791 15.9475Z"
      fill="#00D8FF"
    />
  </svg>
)
