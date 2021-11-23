import React, { useState, useEffect, memo } from "react";

const TakeExamQuestion = ({
    currentQuestionIndex,
    questionList,
    attenderAnswerList,
    setAttenderAnswerList
}) => {
    const [content, setContent] = useState("");
    const [imgPreviewUrl, setImgPreviewUrl] = useState("");
    const [attenderAnswer, setAttenderAnswer] = useState([]); // 작성한 답
    const [choice1, setChoice1] = useState("");
    const [choice2, setChoice2] = useState("");
    const [choice3, setChoice3] = useState("");
    const [choice4, setChoice4] = useState("");
    const [choice5, setChoice5] = useState("");

    useEffect(() => {
        const currentQuestion = questionList[currentQuestionIndex - 1];
        if (currentQuestion == undefined) return;

        setContent(currentQuestion.content);
        setImgPreviewUrl(currentQuestion.pictureUrl);

        // 현재 문제에 작성한 답이 존재하는 경우 (풀고 저장한 문제인 경우)
        if (attenderAnswerList[currentQuestionIndex - 1].length !== 0)
            setAttenderAnswer([
                ...attenderAnswerList[currentQuestionIndex - 1]
            ]);
        else setAttenderAnswer([]);

        if (currentQuestion?.choice != undefined) {
            setChoice1(currentQuestion.choice[1]);
            setChoice2(currentQuestion.choice[2]);
            setChoice3(currentQuestion.choice[3]);
            setChoice4(currentQuestion.choice[4]);
            setChoice5(currentQuestion.choice[5]);
        }
    }, [currentQuestionIndex]);

    const onChangeInputAnswer = (e, value) => {
        if (e.target.checked && !attenderAnswer.includes(value))
            setAttenderAnswer([...attenderAnswer, value]);
        else if (!e.target.checked && attenderAnswer.includes(value)) {
            const index = attenderAnswer.indexOf(value);
            setAttenderAnswer([
                ...attenderAnswer.slice(0, index),
                ...attenderAnswer.slice(index + 1, attenderAnswer.length)
            ]);
        }
    };

    /* 부모 컴포넌트 TakeExam[R]의 attenderAnswerList 변경 */
    useEffect(() => {
        const copiedAttenderAnswerList = attenderAnswerList;
        copiedAttenderAnswerList[currentQuestionIndex - 1] = attenderAnswer;

        setAttenderAnswerList([...copiedAttenderAnswerList]);
    }, [attenderAnswer]);

    return (
        <div className="create_edit_exam_question">
            <form className="question__form">
                <div className="div__question__textarea_img">
                    <textarea
                        name="question_content"
                        value={content}
                        readOnly
                        required
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
                            onChange={(e) => onChangeInputAnswer(e, 1)}
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
                            onChange={(e) => onChangeInputAnswer(e, 2)}
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
                            onChange={(e) => onChangeInputAnswer(e, 3)}
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
                            onChange={(e) => onChangeInputAnswer(e, 4)}
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
                            onChange={(e) => onChangeInputAnswer(e, 5)}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TakeExamQuestion;
