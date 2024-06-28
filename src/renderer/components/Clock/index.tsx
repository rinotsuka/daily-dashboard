/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useEffect, useState } from "react"
import dayjs from "dayjs"

export default function Clock() {
  const [time, setTime] = useState(dayjs())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(dayjs())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const year = time.format("YYYY")
  const month = time.format("M")
  const day = time.format("D")
  const hour = time.format("HH")
  const minute = time.format("mm")
  const second = time.format("ss")

  // 令和年の計算
  const imperialEraName = "R." + (time.year() - 2018)

  return (
    <div css={styles.root}>
      <div css={styles.date}>
        <span css={styles.imperialEraName}>{imperialEraName}</span>
        <span css={styles.year}>{year}</span>
        <span css={styles.unit}>年</span>
        <span css={styles.month}>{month}</span>
        <span css={styles.unit}>月</span>
        <span css={styles.day}>{day}</span>
        <span css={styles.unit}>日</span>
      </div>
      <div css={styles.time}>
        <span css={styles.hour}>{hour}</span>
        <span css={styles.colon}>:</span>
        <span css={styles.minute}>{minute}</span>
        <span css={styles.second}>{second}</span>
      </div>
    </div>
  )
}

const styles = {
  root: css`
    font-family: "Lato", sans-serif;
    text-align: center;
    margin-bottom: 64px;
  `,
  date: css`
    display: block;
    margin-bottom: 4px;
  `,
  imperialEraName: css`
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 1px;
    margin-right: 14px;
  `,
  year: css`
    font-size: 22px;
    font-weight: 600;
    margin-right: 3px;
  `,
  month: css`
    font-size: 22px;
    font-weight: 600;
    margin-left: 8px;
    margin-right: 3px;
  `,
  day: css`
    font-size: 22px;
    font-weight: 600;
    margin-left: 8px;
    margin-right: 3px;
  `,
  unit: css`
    font-family: "Kosugi Maru", sans-serif;
    font-size: 13px;
  `,
  time: css`
    display: block;
    font-size: 70px;
    font-weight: 600;
    letter-spacing: -0px;
  `,
  hour: css`
    color: #fff;
  `,
  colon: css`
    display: inline-block;
    position: relative;
    top: -10px;
    font-size: 56px;
    margin: 0 12px;
  `,
  minute: css`
    color: #fff;
  `,
  second: css`
    display: inline-block;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.5px;
    margin-left: 12px;
  `,
}
