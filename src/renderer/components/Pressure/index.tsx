/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

const pressureStyle = css`
  font-size: 1.2rem;
`

type PressureProps = {
  pressureLevel: string | null
}

export const Pressure: React.FC<PressureProps> = ({ pressureLevel }) => (
  <div css={pressureStyle}>{pressureLevel && `気圧の変動: ${pressureLevel}`}</div>
)
