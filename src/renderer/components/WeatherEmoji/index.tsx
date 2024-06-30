/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

const emojiStyle = css`
  font-size: 2rem;
`

type WeatherEmojiProps = {
  weatherEmoji: string | null
}

export const WeatherEmoji: React.FC<WeatherEmojiProps> = ({ weatherEmoji }) => (
  <div css={emojiStyle}>{weatherEmoji}</div>
)
