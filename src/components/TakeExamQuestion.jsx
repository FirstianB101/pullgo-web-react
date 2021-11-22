import React, { useState, useEffect, useRef, memo } from "react";

const TakeExamQuestion = ({ currentQuestionIndex, questionList }) => {
    const [isNewQuestion, setIsNewQuestion] = useState(true);

    useEffect(() => {
        setIsNewQuestion(
            questionList[currentQuestionIndex - 1]?.content == undefined
        );
    }, [currentQuestionIndex, questionList]);

    const [content, setContent] = useState("");
    const [imgPreviewUrl, setImgPreviewUrl] = useState("");
    const [answer, setAnswer] = useState([]); // Question의 정답 (사용 X)
    const [attenderAnswer, setAttenderAnswer] = useState([]); // 학생이 선택한 답
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
        // setAnswer(currentQuestion.answer);

        if (currentQuestion?.choice != undefined) {
            setChoice1(currentQuestion.choice[1]);
            setChoice2(currentQuestion.choice[2]);
            setChoice3(currentQuestion.choice[3]);
            setChoice4(currentQuestion.choice[4]);
            setChoice5(currentQuestion.choice[5]);
        }
    }, [isNewQuestion, currentQuestionIndex]);

    const onClickBtnSave = (e) => {
        alert("푼 문제들 모두 저장");
    };

    const onChangeInputAnswer = (e, value) => {
        if (e.target.checked && !answer.includes(value))
            setAnswer([...answer, value]);
        else if (!e.target.checked && answer.includes(value)) {
            const index = answer.indexOf(value);
            setAnswer([
                ...answer.slice(0, index),
                ...answer.slice(index + 1, answer.length)
            ]);
        }
    };

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
                            checked={answer != undefined && answer.includes(1)}
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
                            checked={answer != undefined && answer.includes(2)}
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
                            checked={answer != undefined && answer.includes(3)}
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
                            checked={answer != undefined && answer.includes(4)}
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
                            checked={answer != undefined && answer.includes(5)}
                            onChange={(e) => onChangeInputAnswer(e, 5)}
                        />
                    </div>
                </div>
            </form>

            <button
                className="btn__current_question_save"
                onClick={onClickBtnSave}
            >
                현재 문제 저장
            </button>
        </div>
    );
};

export default TakeExamQuestion;
