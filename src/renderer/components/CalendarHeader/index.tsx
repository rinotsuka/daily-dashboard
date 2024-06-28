/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { Dayjs } from "dayjs"

type CalendarHeaderProps = {
  currentDate: Dayjs
  onPrevMonth: () => void
  onNextMonth: () => void
  onToday: () => void
}

export function CalendarHeader({ currentDate, onPrevMonth, onNextMonth, onToday }: CalendarHeaderProps) {
  return (
    <div css={styles.header}>
      <div css={styles.title}>
        <div css={styles.day}>
          <span>{currentDate.format("M")}</span>
          <span css={styles.unit}>月</span>
        </div>
      </div>
      <button css={[styles.button, styles.prev]} onClick={onPrevMonth} />
      <button css={[styles.button, styles.next]} onClick={onNextMonth} />
      <button css={[styles.button, styles.today]} onClick={onToday} />
    </div>
  )
}

const styles = {
  header: css`
    position: relative;
    align-items: center;
    margin-bottom: 8px;
  `,
  title: css``,
  day: css`
    font-family: "Lato", sans-serif;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
  `,
  unit: css`
    display: inline-block;
    font-family: "Lato", sans-serif;
    font-size: 11px;
    font-weight: 700;
    margin-left: 2px;
  `,
  button: css`
    opacity: 0;
    cursor: pointer;
    position: absolute;
    top: 0;
    border: none;
    width: 50%;
    height: 285px;
  `,
  prev: css`
    left: 0;
  `,
  next: css`
    right: 0;
  `,
  today: css`
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 35px;
  `,
}
