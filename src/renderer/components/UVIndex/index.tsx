/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

const uvIndexStyle = css`
  font-size: 1.2rem;
`

type UVIndexProps = {
  uvIndexLevel: string | null
}

export const UVIndex: React.FC<UVIndexProps> = ({ uvIndexLevel }) => (
  <div css={uvIndexStyle}>{uvIndexLevel !== null ? `UVインデックス: ${uvIndexLevel}` : "取得中..."}</div>
)
