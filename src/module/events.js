// classRoom: 반 이름
// title: 수업 이름
// start, end: 날짜, 시작 / 종료 시각 (allDay 디폴트)

let events = [
	{
		id: 0,
		classRoom: "고2 이과",
		title: "[고2 이과] 미적분2",
		allDay: true,
		start: new Date(2021, 7, 4, 12, 0), // 1월: 0
		end: new Date(2021, 7, 4, 14, 0) // 년, 월, 일, 시, 분
	},
	{
		id: 1,
		classRoom: "고3 이과",
		title: "[고3 이과] 확통",
		allDay: true,
		start: new Date(2021, 7, 6, 10, 0),
		end: new Date(2021, 7, 6, 14, 0)
	}
];

// let events = [
//     {
//         id: 0,
//         title: "Test Day",
//         allDay: true,
//         start: new Date(2021, 3, 22),
//         end: new Date(2021, 3, 23)
//     },

//     {
//         id: 1,
//         title: "Play Day",
//         start: new Date(2021, 3, 24),
//         end: new Date(2021, 3, 26)
//     }
// ];

export default events;
