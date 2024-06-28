/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import dayjs, { Dayjs } from "dayjs"

type CalendarTableProps = {
  currentDate: Dayjs
  holidays: string[]
}

export function CalendarTable({ currentDate, holidays }: CalendarTableProps) {
  const isHoliday = (date: Dayjs) => holidays.includes(date.format("YYYY-MM-DD"))
  const isToday = (date: Dayjs) => date.isSame(dayjs(), "day")

  const generateCalendar = () => {
    const startOfMonth = currentDate.startOf("month")
    const endOfMonth = currentDate.endOf("month")
    const startDate = startOfMonth.startOf("week")
    const endDate = endOfMonth.endOf("week")

    let date = startDate
    const weeks = []

    while (date.isBefore(endDate, "day")) {
      const days = []
      for (let i = 0; i < 7; i++) {
        const isSameMonth = date.month() === currentDate.month()
        const isSaturday = date.day() === 6
        const isSunday = date.day() === 0

        days.push(
          <td
            key={date.toString()}
            css={[
              styles.cell,
              !isSameMonth && styles.diffMonth,
              isSaturday && styles.saturday,
              isSunday && styles.sunday,
              isHoliday(date) && styles.holiday,
              isToday(date) && styles.today,
            ]}
          >
            <div css={styles.cellInner}>
              {date.date()}
              <span></span>
            </div>
          </td>
        )
        date = date.add(1, "day")
      }
      weeks.push(<tr key={date.toString()}>{days}</tr>)
    }

    return weeks
  }

  return (
    <table css={styles.table}>
      <thead>
        <tr>
          <th css={[styles.cell, styles.week, styles.sunday]}>日</th>
          <th css={[styles.cell, styles.week]}>月</th>
          <th css={[styles.cell, styles.week]}>火</th>
          <th css={[styles.cell, styles.week]}>水</th>
          <th css={[styles.cell, styles.week]}>木</th>
          <th css={[styles.cell, styles.week]}>金</th>
          <th css={[styles.cell, styles.week, styles.saturday]}>土</th>
        </tr>
      </thead>
      <tbody>{generateCalendar()}</tbody>
    </table>
  )
}

const styles = {
  table: css`
    width: 100%;
  `,
  cell: css`
    border: none;
    font-weight: 500;
    font-size: 16px;
    text-align: center;
    letter-spacing: 1.5px;
    color: #e2e8f0;
    padding: 8px 14px;
  `,
  cellInner: css`
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
  `,
  week: css`
    font-family: "Kosugi Maru", sans-serif;
    font-weight: 700;
    font-size: 15px;
  `,
  diffMonth: css`
    color: #334155 !important;
  `,
  saturday: css`
    color: #60a5fa;
  `,
  sunday: css`
    color: #f87171;
  `,
  holiday: css`
    color: #f87171;
  `,
  today: css`
    span {
      display: inline-block;
      transform: translate(-50%, -50%);
      position: absolute;
      top: calc(50% + 14px);
      left: 50%;
      z-index: 1;
      border-radius: 99px;
      background-color: #6ee7b7;
      width: 12px;
      height: 4px;
    }
  `,
}
