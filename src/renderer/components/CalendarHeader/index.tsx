/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import dayjs, { Dayjs } from "dayjs"

const styles = {
  header: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  `,
  title: css`
    font-size: 1.5rem;
  `,
  button: css`
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
  `,
}

type CalendarHeaderProps = {
  currentDate: Dayjs
  reiwaYear: number
  onPrevMonth: () => void
  onNextMonth: () => void
}

export function CalendarHeader({ currentDate, reiwaYear, onPrevMonth, onNextMonth }: CalendarHeaderProps) {
  return (
    <div css={styles.header}>
      <button css={styles.button} onClick={onPrevMonth}>
        前の月
      </button>
      <div css={styles.title}>
        <h1>{`令和${reiwaYear}年`}</h1>
        <h2>{currentDate.format("YYYY年MM月")}</h2>
      </div>
      <button css={styles.button} onClick={onNextMonth}>
        次の月
      </button>
    </div>
  )
}
