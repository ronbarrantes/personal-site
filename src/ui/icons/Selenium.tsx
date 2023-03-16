import React from 'react'

interface SeleniumProps extends React.SVGAttributes<SVGElement> {
  children?: never
  color?: string
}

export const Selenium = (props: SeleniumProps) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M26.3897 25.3059C25.6209 25.2835 24.8715 25.5385 24.2902 26.0202C23.709 26.5019 23.3385 27.175 23.2524 27.9059C23.2486 27.92 23.2482 27.9348 23.2514 27.9491C23.2546 27.9634 23.2613 27.9768 23.2708 27.9882C23.2804 27.9997 23.2926 28.0088 23.3065 28.0149C23.3204 28.021 23.3355 28.024 23.3508 28.0235H29.4408C29.4548 28.0236 29.4687 28.0209 29.4815 28.0154C29.4944 28.01 29.5058 28.002 29.5151 27.9919C29.5245 27.9819 29.5314 27.9701 29.5356 27.9573C29.5397 27.9445 29.541 27.9309 29.5392 27.9176C29.4794 27.1735 29.1151 26.482 28.5255 25.9931C27.9359 25.5041 27.1684 25.2572 26.3897 25.3059Z"
      fill="#01A71C"
    />
    <path
      d="M39.4434 5.77647L26.5252 19.6471C26.4884 19.6852 26.4437 19.7156 26.3939 19.7364C26.3441 19.7573 26.2904 19.768 26.2361 19.768C26.1818 19.768 26.1281 19.7573 26.0783 19.7364C26.0286 19.7156 25.9839 19.6852 25.947 19.6471L19.3526 13.1412C19.2967 13.0744 19.2662 12.9914 19.2662 12.9059C19.2662 12.8203 19.2967 12.7374 19.3526 12.6706L21.5302 10C21.5667 9.95142 21.6147 9.91184 21.6703 9.88454C21.726 9.85724 21.7876 9.843 21.8501 9.843C21.9126 9.843 21.9743 9.85724 22.0299 9.88454C22.0855 9.91184 22.1335 9.95142 22.17 10L25.8609 13.9059C25.8978 13.9479 25.944 13.9818 25.996 14.005C26.0481 14.0282 26.1049 14.0402 26.1623 14.0402C26.2197 14.0402 26.2765 14.0282 26.3286 14.005C26.3806 13.9818 26.4268 13.9479 26.4637 13.9059L36.749 0.423529C36.7776 0.383686 36.7946 0.337241 36.7981 0.289023C36.8015 0.240804 36.7915 0.192573 36.7689 0.149342C36.7462 0.106111 36.7119 0.0694588 36.6695 0.0431957C36.6271 0.0169327 36.5781 0.00201723 36.5276 0L0.307575 0C0.226001 0 0.147768 0.0309873 0.0900865 0.0861451C0.0324051 0.141303 0 0.216113 0 0.294118L0 39.7059C0 39.7839 0.0324051 39.8587 0.0900865 39.9139C0.147768 39.969 0.226001 40 0.307575 40H39.6771C39.7587 40 39.8369 39.969 39.8946 39.9139C39.9523 39.8587 39.9847 39.7839 39.9847 39.7059V5.95294C40.0092 5.8843 40.0041 5.80917 39.9707 5.74408C39.9372 5.679 39.8781 5.62928 39.8063 5.60588C39.7345 5.58248 39.656 5.58731 39.5879 5.6193C39.5198 5.65129 39.4678 5.70783 39.4434 5.77647ZM11.1465 35.6118C8.56199 35.7363 6.02856 34.8922 4.08459 33.2588C4.02318 33.1922 3.98929 33.1065 3.98929 33.0176C3.98929 32.9288 4.02318 32.8431 4.08459 32.7765L5.62246 30.7176C5.64786 30.6755 5.68182 30.6386 5.72235 30.6092C5.76288 30.5797 5.80916 30.5584 5.85845 30.5463C5.90775 30.5343 5.95908 30.5318 6.0094 30.539C6.05973 30.5462 6.10804 30.5629 6.15149 30.5882C7.55637 31.8337 9.40301 32.5232 11.3187 32.5176C13.3364 32.5176 14.3207 31.6235 14.3207 30.6824C14.3207 27.7647 4.37986 29.7647 4.37986 23.5529C4.37986 20.8118 6.84046 18.5294 10.9251 18.5294C13.2691 18.4497 15.5639 19.1854 17.3841 20.6C17.4525 20.668 17.4908 20.7586 17.4908 20.8529C17.4908 20.9473 17.4525 21.0379 17.3841 21.1059L15.8709 23.1176C15.8396 23.1577 15.8001 23.1911 15.7548 23.2159C15.7095 23.2407 15.6593 23.2564 15.6074 23.2619C15.5555 23.2674 15.5029 23.2627 15.453 23.248C15.4031 23.2333 15.3569 23.209 15.3172 23.1765C13.9751 22.1564 12.3072 21.6082 10.5929 21.6235C9.01809 21.6235 8.13227 22.2941 8.13227 23.2824C8.13227 25.9059 18.0485 24.1529 18.0485 30.3412C18.0485 33.3294 15.797 35.6118 11.1342 35.6118H11.1465ZM32.8244 29.8824C32.8261 29.9261 32.8184 29.9696 32.8017 30.0103C32.785 30.0511 32.7596 30.088 32.7273 30.119C32.695 30.1499 32.6563 30.1741 32.6137 30.1901C32.5712 30.206 32.5256 30.2134 32.4799 30.2118H23.3757C23.3611 30.2132 23.347 30.2174 23.3341 30.2242C23.3213 30.2309 23.3099 30.24 23.3008 30.2509C23.2916 30.2619 23.2848 30.2744 23.2808 30.2879C23.2767 30.3014 23.2755 30.3155 23.2773 30.3294C23.4249 31.1429 23.8855 31.8742 24.5686 32.3793C25.2516 32.8844 26.1076 33.1268 26.9681 33.0588C28.0974 33.036 29.1939 32.6919 30.1177 32.0706C30.1538 32.0417 30.1958 32.0204 30.2411 32.0082C30.2864 31.9961 30.3339 31.9932 30.3804 31.9999C30.4269 32.0066 30.4714 32.0226 30.511 32.047C30.5505 32.0713 30.5842 32.1034 30.6098 32.1412L31.7171 33.6824C31.7632 33.7508 31.7812 33.8332 31.7676 33.9136C31.754 33.9939 31.7097 34.0667 31.6433 34.1176C30.1815 35.1377 28.4081 35.6671 26.5991 35.6235C25.6953 35.6717 24.7911 35.5388 23.9442 35.2333C23.0974 34.9278 22.3266 34.4564 21.6814 33.8494C21.0362 33.2424 20.5308 32.5132 20.1976 31.7085C19.8643 30.9037 19.7106 30.0413 19.7463 29.1765C19.7212 28.3324 19.8754 27.4922 20.1994 26.7067C20.5235 25.9211 21.0107 25.2066 21.6316 24.6062C22.2526 24.0058 22.9944 23.532 23.8123 23.2135C24.6301 22.895 25.507 22.7383 26.3899 22.7529C30.2161 22.7529 32.8121 25.4941 32.8121 29.5059L32.8244 29.8824Z"
      fill="#01A71C"
    />
  </svg>
)