import React from 'react'

interface MySqlProps extends React.SVGAttributes<SVGElement> {
  children?: never
  color?: string
}

export const MySql = (props: MySqlProps) => (
  <svg
    width="41"
    height="40"
    viewBox="0 0 41 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.6874 6.63027C9.30221 6.62905 8.91849 6.67793 8.5459 6.77569V6.82658H8.60116C8.86801 7.2294 9.16554 7.61103 9.49109 7.96809C9.71503 8.41305 9.90989 8.85657 10.1324 9.30154C10.16 9.27391 10.1876 9.24483 10.1876 9.24483C10.3942 9.08085 10.5559 8.86723 10.6576 8.62389C10.7593 8.38055 10.7977 8.11541 10.7693 7.85321C10.6475 7.66543 10.5359 7.47126 10.4348 7.27155C10.2676 6.99381 9.90552 6.85421 9.68304 6.63173"
      fill="#5D87A1"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M37.309 30.897C35.4747 30.7682 33.6341 31.034 31.9112 31.6765C31.4939 31.8437 30.8279 31.8437 30.7697 32.3715C30.9936 32.594 31.0198 32.9532 31.2161 33.2629C31.597 33.9078 32.0865 34.4819 32.663 34.9599C33.2447 35.4049 33.8263 35.8484 34.4443 36.2381C35.5277 36.9085 36.7535 37.2967 37.8092 37.9642C38.4229 38.3539 39.0336 38.8541 39.6473 39.2729C39.9526 39.4954 40.146 39.8546 40.5358 40V39.9157C40.4213 39.6066 40.2796 39.3083 40.1126 39.0243C39.8349 38.748 39.5557 38.4964 39.2765 38.2187C38.4608 37.1401 37.4849 36.1927 36.3827 35.4093C35.4913 34.7956 33.5428 33.9551 33.1836 32.9372L33.1269 32.8805C33.7791 32.7881 34.4219 32.6382 35.0478 32.4326C35.993 32.1825 36.8553 32.2392 37.8281 31.9964C38.2746 31.8844 39.0816 31.6067 39.0816 31.6067V31.1704C38.5843 30.676 38.228 30.0144 37.7045 29.5476C36.2803 28.3044 34.7626 27.1726 33.1647 26.1623C32.3111 25.6112 31.2103 25.2564 30.3015 24.7867C29.9728 24.6209 29.429 24.5395 29.2298 24.2632C28.7778 23.6001 28.3994 22.8897 28.1013 22.1445C27.3045 20.6322 26.5323 18.9556 25.846 17.356C25.4397 16.2841 24.9712 15.2367 24.4427 14.2194C21.8926 9.88385 18.2118 6.32314 13.794 3.91827C12.6793 3.37871 11.4942 2.99884 10.2735 2.78985C9.58425 2.76077 8.89789 2.70697 8.21008 2.68079C7.76607 2.38991 7.34375 2.06721 6.94643 1.71524C5.37304 0.719148 1.33051 -1.42136 0.173012 1.41278C-0.568602 3.20283 1.27525 4.96235 1.90781 5.87119C2.44118 6.51201 2.91113 7.20306 3.31106 7.93462C3.50446 8.40286 3.55972 8.89872 3.7473 9.38877C4.15095 10.6468 4.63024 11.8792 5.18255 13.0794C5.47794 13.6726 5.81824 14.2423 6.20045 14.7837C6.42293 15.0876 6.80683 15.2199 6.88971 15.7216C6.58476 16.3771 6.37142 17.0714 6.25571 17.785C5.77503 19.303 5.59813 20.9008 5.73511 22.4872C5.87209 24.0735 6.32026 25.6174 7.05403 27.0305C7.49028 27.7183 8.54017 29.232 9.94342 28.6533C11.1809 28.1589 10.9061 26.5899 11.2638 25.2157C11.3452 24.8827 11.2914 24.6646 11.4557 24.445V24.7126C11.4557 24.7126 12.1581 26.2554 12.5071 27.0392C13.4562 28.4774 14.6352 29.7497 15.997 30.8054C16.5357 31.2757 16.9697 31.8539 17.2709 32.5024V33.0012H17.8918C17.8789 32.7763 17.8165 32.557 17.7092 32.359C17.6019 32.1609 17.4522 31.989 17.2709 31.8553C16.7617 31.3312 16.2953 30.7672 15.8763 30.1685C14.7381 28.5474 13.7343 26.836 12.875 25.0514C12.4387 24.1789 12.0708 23.2221 11.7218 22.351C11.5619 22.0151 11.5619 21.5076 11.2929 21.3331C10.7961 21.9208 10.3651 22.5611 10.0074 23.2424C9.57319 24.6196 9.32046 26.0475 9.25561 27.49C9.14946 27.5191 9.20181 27.49 9.14946 27.5452C8.29296 27.3198 7.99777 26.3936 7.67495 25.6083C6.84102 23.1865 6.75689 20.5695 7.43356 18.0991C7.6197 17.5102 8.42675 15.6547 8.10393 15.0919C7.94252 14.5553 7.40594 14.2485 7.1122 13.8254C6.73721 13.2561 6.41452 12.654 6.1481 12.0266C5.50973 10.4619 5.18691 8.71695 4.49183 7.14066C4.10706 6.38256 3.65905 5.65825 3.15256 4.97543C2.5923 4.29335 2.09809 3.55959 1.6766 2.78404C1.54282 2.4743 1.35523 1.96826 1.56899 1.6309C1.58342 1.53719 1.62798 1.45073 1.69594 1.38461C1.7639 1.31849 1.85155 1.27631 1.94562 1.26445C2.2917 0.956174 3.28488 1.34879 3.63243 1.51747C4.5665 1.8852 5.45623 2.35689 6.28479 2.92363C6.65996 3.20574 7.54408 3.91972 7.54408 3.91972H7.80583C8.69576 4.11313 9.69622 3.97353 10.5338 4.22509C11.9441 4.69521 13.2899 5.34005 14.54 6.14457C18.2243 8.49323 21.2195 11.7774 23.2198 15.662C23.5542 16.3003 23.6953 16.8863 24.0007 17.5523C24.5823 18.9192 25.3094 20.3152 25.891 21.6443C26.4042 22.9593 27.0678 24.2104 27.8687 25.3727C28.2846 25.9544 29.9554 26.2627 30.7072 26.5681C31.3601 26.7939 32.0007 27.0536 32.6266 27.346C33.5733 27.9277 34.517 28.598 35.4084 29.2364C35.8519 29.5709 37.2436 30.2659 37.3279 30.8229"
      fill="#00758F"
    />
  </svg>
)