/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import dayjs from "dayjs"

// 現在の日付と時刻を取得
const now = dayjs()
const year = now.format("YYYY")
const month = now.format("MM")
const day = now.format("DD")
const hour = now.format("HH")
const minute = now.format("mm")

const reiwaYear = "令和" + (Number(year) - 2018)

export default function Clock() {
  return (
    <div css={styles.root}>
      {`${reiwaYear}年`}
      {`${year}年${month}月${day}日`}
      {`${hour}:${minute}`}
    </div>
  )
}

const styles = {
  root: css``,
}
