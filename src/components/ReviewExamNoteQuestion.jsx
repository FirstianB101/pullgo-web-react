import React, { useState, useEffect, memo } from "react";

const ReviewExamNoteQuestion = ({ currentQuestionIndex, questionList }) => {
    const [content, setContent] = useState("");
    const [imgPreviewUrl, setImgPreviewUrl] = useState("");
    const [answer, setAnswer] = useState([]);
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
        setAnswer(currentQuestion.answer);

        if (currentQuestion?.choice != undefined) {
            setChoice1(currentQuestion.choice[1]);
            setChoice2(currentQuestion.choice[2]);
            setChoice3(currentQuestion.choice[3]);
            setChoice4(currentQuestion.choice[4]);
            setChoice5(currentQuestion.choice[5]);
        }
    }, [currentQuestionIndex, questionList]);

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
                            checked={answer != undefined && answer.includes(1)}
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
                            checked={answer != undefined && answer.includes(2)}
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
                            checked={answer != undefined && answer.includes(3)}
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
                            checked={answer != undefined && answer.includes(4)}
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
                            checked={answer != undefined && answer.includes(5)}
                            readOnly
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ReviewExamNoteQuestion;
