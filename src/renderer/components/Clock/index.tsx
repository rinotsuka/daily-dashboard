/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useEffect, useState } from "react"
import dayjs from "dayjs"

const styles = {
  root: css`
    font-size: 2rem;
    text-align: center;
  `,
}

// 令和年の計算
// const reiwaYear = currentDate.year() - 2018

export default function Clock() {
  const [time, setTime] = useState(dayjs())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(dayjs())
    }, 100)

    return () => clearInterval(intervalId)
  }, [])

  const hour = time.format("HH")
  const minute = time.format("mm")

  return <div css={styles.root}>{`${hour}:${minute}`}</div>
}
