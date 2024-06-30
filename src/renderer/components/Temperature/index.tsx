/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

const tempStyle = css`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`

type TemperatureProps = {
  temperature: number | null
}

export const Temperature: React.FC<TemperatureProps> = ({ temperature }) => (
  <div css={tempStyle}>{temperature !== null ? `${temperature}°C` : "取得中..."}</div>
)
