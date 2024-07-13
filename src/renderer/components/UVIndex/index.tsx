/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

type UVIndexProps = {
  uvIndexLevel: string | null
}

export const UVIndex: React.FC<UVIndexProps> = ({ uvIndexLevel }) => (
  <div css={styles.root}>
    <span css={styles.prefix}>UV</span>
    {/* <span>{uvIndexLevel && uvIndexLevel}</span> */}
    <span>●</span>
  </div>
)

const styles = {
  root: css`
    border-radius: 999px;
    background-color: #e2e8f0;
    color: #ef4444;
    font-size: 16px;
    margin-right: 24px;
    padding: 6px 16px;
  `,
  prefix: css`
    font-family: "Passion One", sans-serif;
    font-size: 20px;
    color: #52525b;
    margin-right: 12px;
  `,
}
