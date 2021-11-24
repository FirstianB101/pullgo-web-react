/* Date 객체를 인자로 받아서 "2021-08-09" 형식의 string으로 반환 */
const dateToStr = (date) => {
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
};

/* state인 date("2021-08-09" 형태)와
 * state인 시간을 나타내는 start 또는 end("14:05" 형태)를 인자로 받아서
 * 날짜 + 시간 형태의 Date 객체로 반환 */
const dateWithTime = (date, time) => {
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);

    // 시간 분해
    let hour = time.slice(0, 2);
    let min = time.slice(3, 5);

    return new Date(year, month - 1, day, hour, min);
};

/* Date 객체를 인자로 받아서 "2021-08" 형식(년, 월)의 string으로 반환 */
const dateToYearMonthStr = (date) => {
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    return year + "-" + month;
};

/* 문자열 yearMonth(년, 월)를 인자로 받아서 sinceDate (문자열) 반환
 * e.g. getSinceDate("2021-09")
 * => sinceDate: "2021-09-01"
 */
const getSinceDate = (yearMonth) => {
    return yearMonth + "-01";
};

/* 문자열 yearMonth(년, 월)를 인자로 받아서 untilDate (문자열) 반환
 * e.g. getUntilDate("2021-09")
 * => untilDate: "2021-10-01"
 */
const getUntilDate = (yearMonth) => {
    // ~년 12월 이면, 그 다음 년도 1월로 반환
    if (yearMonth.slice(5) == "12")
        return `${Number(yearMonth.slice(0, 4)) + 1}-01-01`;

    let year = yearMonth.slice(0, 4);
    let month = Number(yearMonth.slice(5, 7)) + 1;
    if (month === 13) month = "01";
    else if (month < 10) month = "0" + month;
    else month = String(month);
    return year + "-" + month + "-01";
};