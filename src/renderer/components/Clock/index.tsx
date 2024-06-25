/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import dayjs from "dayjs"

// 現在の日付と時刻を取得
const now = dayjs()
const hour = now.format("HH")
const minute = now.format("mm")

export default function Clock() {
  return <div css={styles.root}>{`${hour}:${minute}`}</div>
}

const styles = {
  root: css``,
}
