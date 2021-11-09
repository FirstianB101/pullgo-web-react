// 하이픈 없는 phone 문자열에 하이픈 추가하여 반환
export const insertHyphen = (phoneWithoutHyphen) => {
    return phoneWithoutHyphen.replace(
        /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
        "$1-$2-$3"
    );
};
