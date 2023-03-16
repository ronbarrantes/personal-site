import React from 'react'

interface FluentUiProps extends React.SVGAttributes<SVGElement> {
  children?: never
  color?: string
}

export const FluentUi = (props: FluentUiProps) => (
  <svg
    width="48"
    height="40"
    viewBox="0 0 48 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="mask0_76_351"
      style="mask-type:alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="48"
      height="40"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.77899 13.103C6.77899 27.9347 7.05028 29.7385 9.67419 32.3625C13.0865 35.7747 19.7314 35.3926 22.5779 31.6206C24.451 29.1388 24.6512 27.3725 24.6534 13.2961L24.6561 0H28.008H31.36L31.3564 12.4022C31.3533 25.2152 30.9953 29.2894 29.5955 32.4541C28.3955 35.1665 25.8597 37.7385 23.2 38.9408C21.1508 39.8673 20.1806 40 15.4623 40C10.3446 40 9.93251 39.9307 7.43686 38.6548C4.3629 37.0825 2.23732 34.556 1.12582 31.1535C0.492519 29.2152 0.335194 26.4197 0.182792 14.4134L0 0H3.38949H6.77899V13.103ZM47.4494 19.8883V39.7765H44.0974H40.7455V19.8883V0H44.0974H47.4494V19.8883Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0_76_351)">
      <rect
        x="-0.818848"
        y="-1.7878"
        width="48.2682"
        height="44.2458"
        fill="url(#paint0_linear_76_351)"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_76_351"
        x1="-0.818848"
        y1="20.3351"
        x2="47.4493"
        y2="20.3351"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#71DBE2" />
        <stop offset="1" stop-color="#77DF75" />
      </linearGradient>
    </defs>
  </svg>
)
