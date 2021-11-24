import React, { useState, useEffect, memo } from "react";

// 문제 보기 번호 (1, 2, 3, 4, 5 원문자)
const questionExampleIndex = {
    1: "①",
    2: "②",
    3: "③",
    4: "④",
    5: "⑤"
};

const ReviewExamNoteQuestion = ({
    currentQuestionIndex,
    questionList,
    attenderAnswerList
}) => {
    const [content, setContent] = useState("");
    const [imgPreviewUrl, setImgPreviewUrl] = useState("");
    const [answer, setAnswer] = useState([]); // 문제 정답
    const [choice1, setChoice1] = useState("");
    const [choice2, setChoice2] = useState("");
    const [choice3, setChoice3] = useState("");
    const [choice4, setChoice4] = useState("");
    const [choice5, setChoice5] = useState("");

    // 학생이 선택한 답안
    const [attenderAnswer, setAttenderAnswer] = useState([]);

    useEffect(() => {
        const currentQuestion = questionList[currentQuestionIndex - 1];
        if (currentQuestion == undefined) return;

        setContent(currentQuestion.content);
        setImgPreviewUrl(currentQuestion.pictureUrl);
        const sortedAnswer = currentQuestion.answer;
        sortedAnswer.sort((n1, n2) => n1 - n2);
        setAnswer(sortedAnswer);

        if (currentQuestion?.choice != undefined) {
            setChoice1(currentQuestion.choice[1]);
            setChoice2(currentQuestion.choice[2]);
            setChoice3(currentQuestion.choice[3]);
            setChoice4(currentQuestion.choice[4]);
            setChoice5(currentQuestion.choice[5]);
        }
    }, [currentQuestionIndex, questionList]);

    useEffect(() => {
        if (attenderAnswerList[currentQuestionIndex - 1] == undefined) return;

        const sortedAnswer =
            attenderAnswerList[currentQuestionIndex - 1].answer;
        sortedAnswer.sort((n1, n2) => n1 - n2);

        setAttenderAnswer(sortedAnswer);
    }, [currentQuestionIndex, attenderAnswerList]);

    /* 문제 정답 문자열 빈환 */
    const getQuestionAnswer = () => {
        const currentQuestion = questionList[currentQuestionIndex - 1];
        if (currentQuestion == undefined) return;

        let answerStr = "";
        for (let i = 0; i < answer.length; i++) {
            // answerStr += `${answer[i]}. ${currentQuestion.choice[answer[i]]} `;
            answerStr += `${questionExampleIndex[answer[i]]} ${currentQuestion.choice[answer[i]]} `;
            answerStr += `\u00A0`; // 공백
            answerStr += `\u00A0`;
        }

        return answerStr;
    };

    /* 문제 맞으면 O 반환 */
    const gradeQuestionCorrect = () => {
        return JSON.stringify(answer) === JSON.stringify(attenderAnswer)
            ?
            < span className="grade_question_correct">O</span >
            : null;
    };

    /* 문제 틀리면면 X 반환 */
    const gradeQuestionWrong = () => {
        return JSON.stringify(answer) !== JSON.stringify(attenderAnswer)
            ? < span className="grade_question_wrong">❌</span >
            : null;
    };

    return (
        <div className="create_edit_exam_question">
            <form className="question__form">
                <div className="div__question__textarea_img">
                    <textarea
                        name="question_content"
                        value={content}
                        readOnly
                    ></textarea>

                    <div className="question_picture__group">
                        {imgPreviewUrl != "" && imgPreviewUrl != undefined ? (
                            <div className="question_picture__container">
                                <img src={imgPreviewUrl} />
                            </div>
                        ) : null}
                    </div>
                </div>

                <div className="question_choice_answer__group">
                    <div className="question_choice_answer__container">
                        <span>①</span>
                        <input
                            type="text"
                            name="question_choice"
                            value={choice1}
                            readOnly
                        />
                        <input
                            type="checkbox"
                            name="question_answer_checkbox"
                            value={1}
                            checked={
                                attenderAnswer != undefined &&
                                attenderAnswer.includes(1)
                            }
                            readOnly
                        />
                    </div>

                    <div className="question_choice_answer__container">
                        <span>②</span>
                        <input
                            type="text"
                            name="question_choice"
                            value={choice2}
                            readOnly
                        />
                        <input
                            type="checkbox"
                            name="question_answer_checkbox"
                            value={2}
                            checked={
                                attenderAnswer != undefined &&
                                attenderAnswer.includes(2)
                            }
                            readOnly
                        />
                    </div>

                    <div className="question_choice_answer__container">
                        <span>③</span>
                        <input
                            type="text"
                            name="question_choice"
                            value={choice3}
                            readOnly
                        />
                        <input
                            type="checkbox"
                            name="question_answer_checkbox"
                            value={3}
                            checked={
                                attenderAnswer != undefined &&
                                attenderAnswer.includes(3)
                            }
                            readOnly
                        />
                    </div>

                    <div className="question_choice_answer__container">
                        <span>④</span>
                        <input
                            type="text"
                            name="question_choice"
                            value={choice4}
                            readOnly
                        />
                        <input
                            type="checkbox"
                            name="question_answer_checkbox"
                            value={4}
                            checked={
                                attenderAnswer != undefined &&
                                attenderAnswer.includes(4)
                            }
                            readOnly
                        />
                    </div>

                    <div className="question_choice_answer__container">
                        <span>⑤</span>
                        <input
                            type="text"
                            name="question_choice"
                            value={choice5}
                            readOnly
                        />
                        <input
                            type="checkbox"
                            name="question_answer_checkbox"
                            value={5}
                            checked={
                                attenderAnswer != undefined &&
                                attenderAnswer.includes(5)
                            }
                            readOnly
                        />
                    </div>
                </div>

                <div className="question_answer">
                    {gradeQuestionCorrect()}
                    {gradeQuestionWrong()}
                    <span>[정답] {getQuestionAnswer()}</span>
                </div>
            </form>
        </div>
    );
};

export default ReviewExamNoteQuestion;
