// 하이픈 없는 phone 문자열에 하이픈 추가하여 반환
export const insertHyphen = (phoneWithoutHyphen) => {
    return phoneWithoutHyphen.replace(
        /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
        "$1-$2-$3"
    );
};

/* "01012345678" 형태의 phone을
    "010-1234-5678" 형태의 parsedPhone 으로 반환 */
export const parsingPhone = (phone) => {
    if (phone?.length !== 11) return;

    const parsedPhone =
        phone.slice(0, 3) + "-" + phone.slice(3, 7) + "-" + phone.slice(7, 11);
    return parsedPhone;
};
