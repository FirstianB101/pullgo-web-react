import React, { useState, useEffect, memo } from "react";

import Fab from "@mui/material/Fab";

const CreateEditExamQuestion = ({
    // currentQuestion,
    currentQuestionIndex,
    questionList,
    setQuestionList
}) => {
    const [isNewQuestion, setIsNewQuestion] = useState(true);
    // const isNewQuestion =
    //     questionList[currentQuestionIndex - 1]?.content == undefined;
    // const isNewQuestion = currentQuestion?.content == undefined;

    useEffect(() => {
        setIsNewQuestion(
            questionList[currentQuestionIndex - 1]?.content == undefined
        );
    }, [currentQuestionIndex, questionList]);

    const [content, setContent] = useState("");
    // <input type="file" /> 로 입력한 pictureUrl
    const [inputPictureUrl, setInputPictureUrl] = useState("");
    // <img src="" /> 에 입력할 pictureUrl (src 입력 url)
    const [imgPictureUrl, setImgPictureUrl] = useState("");
    const [answer, setAnswer] = useState([]);
    const [choice1, setChoice1] = useState("");
    const [choice2, setChoice2] = useState("");
    const [choice3, setChoice3] = useState("");
    const [choice4, setChoice4] = useState("");
    const [choice5, setChoice5] = useState("");

    useEffect(() => {
        if (isNewQuestion) {
            setContent("");
            setInputPictureUrl("");
            setImgPictureUrl("");
            setAnswer([]);
            setChoice1("");
            setChoice2("");
            setChoice3("");
            setChoice4("");
            setChoice5("");
        } else {
            // !isNewQuestion: question에 content 속성이 존재하는 경우
            // => form 요소들 채워넣어서 기존 question 정보들 보여줌
            const currentQuestion = questionList[currentQuestionIndex - 1];

            setContent(currentQuestion.content);
            // setInputPictureUrl(currentQuestion.pictureUrl);
            setImgPictureUrl(currentQuestion.pictureUrl);
            setAnswer(currentQuestion.answer);

            if (currentQuestion?.choice != undefined) {
                setChoice1(currentQuestion.choice[1]);
                setChoice2(currentQuestion.choice[2]);
                setChoice3(currentQuestion.choice[3]);
                setChoice4(currentQuestion.choice[4]);
                setChoice5(currentQuestion.choice[5]);
            }
        }
    }, [isNewQuestion, currentQuestionIndex]);

    const onClickBtnSave = (e) => {
        alert("현재 문제 저장");

        // answer 배열 정렬
        const sortedAnswer = answer.sort((n1, n2) => n1 - n2);

        // 기존 question 객체 복사 후, 수정 또는 추가한 내용 반영
        const currentQuestion = questionList[currentQuestionIndex - 1];
        currentQuestion.content = content;
        currentQuestion.pictureUrl = inputPictureUrl;
        currentQuestion.answer = sortedAnswer;
        currentQuestion.choice = {
            1: choice1,
            2: choice2,
            3: choice3,
            4: choice4,
            5: choice5
        };

        // 부모 컴포넌트로부터 props로 받은 setQuestionList()로 변경
        const questionListCopy = questionList;
        questionListCopy[currentQuestionIndex - 1] = currentQuestion;
        setQuestionList([...questionListCopy]);
    };

    const onChangeTextAreaContent = (e) => {
        setContent(e.target.value);
    };

    const onChangeInputPictureUrl = (e) => {
        setInputPictureUrl(e.target.value);
        setImgPictureUrl(e.target.value);

        // console.log(e.target.value);
        console.log(e.target.files[0]);
    };

    const onChangeImgPictureUrl = (e) => {
        setImgPictureUrl(e.target.value);
    };

    // value: 보기 숫자 번호
    const onChangeInputChoice = (e, value) => {
        // let changedChoice = choice;
        // changedChoice[value] = e.target.value;
        // setChoice(changedChoice);

        switch (value) {
            case 1:
                setChoice1(e.target.value);
                break;
            case 2:
                setChoice2(e.target.value);
                break;
            case 3:
                setChoice3(e.target.value);
                break;
            case 4:
                setChoice4(e.target.value);
                break;
            case 5:
                setChoice5(e.target.value);
                break;
        }
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
                <img className="question_picture" src={imgPictureUrl} />

                <textarea
                    name="question_content"
                    value={content}
                    onChange={onChangeTextAreaContent}
                    placeholder="문제 텍스트를 입력해주세요."
                    required
                ></textarea>

                <input
                    type="file"
                    name="question_image"
                    value={inputPictureUrl}
                    onChange={onChangeInputPictureUrl}
                    accept=".jpg,.jpeg,.png,.pdf"
                />

                <div className="question_choice_answer_group">
                    <h3>
                        보기를 입력하고 정답을 선택해주세요. (복수 정답 선택
                        가능)
                    </h3>

                    <span>1</span>
                    <input
                        type="text"
                        name="question_choice"
                        value={choice1}
                        onChange={(e) => onChangeInputChoice(e, 1)}
                        placeholder="1번 보기 작성"
                    />
                    <input
                        type="checkbox"
                        name="question_answer_checkbox"
                        value={1}
                        checked={answer != undefined && answer.includes(1)}
                        onChange={(e) => onChangeInputAnswer(e, 1)}
                    />
                    <br />

                    <span>2</span>
                    <input
                        type="text"
                        name="question_choice"
                        value={choice2}
                        onChange={(e) => onChangeInputChoice(e, 2)}
                        placeholder="2번 보기 작성"
                    />
                    <input
                        type="checkbox"
                        name="question_answer_checkbox"
                        value={2}
                        checked={answer != undefined && answer.includes(2)}
                        onChange={(e) => onChangeInputAnswer(e, 2)}
                    />
                    <br />

                    <span>3</span>
                    <input
                        type="text"
                        name="question_choice"
                        value={choice3}
                        onChange={(e) => onChangeInputChoice(e, 3)}
                        placeholder="3번 보기 작성"
                    />
                    <input
                        type="checkbox"
                        name="question_answer_checkbox"
                        value={3}
                        checked={answer != undefined && answer.includes(3)}
                        onChange={(e) => onChangeInputAnswer(e, 3)}
                    />
                    <br />

                    <span>4</span>
                    <input
                        type="text"
                        name="question_choice"
                        value={choice4}
                        onChange={(e) => onChangeInputChoice(e, 4)}
                        placeholder="4번 보기 작성"
                    />
                    <input
                        type="checkbox"
                        name="question_answer_checkbox"
                        value={4}
                        checked={answer != undefined && answer.includes(4)}
                        onChange={(e) => onChangeInputAnswer(e, 4)}
                    />
                    <br />

                    <span>5</span>
                    <input
                        type="text"
                        name="question_choice"
                        value={choice5}
                        onChange={(e) => onChangeInputChoice(e, 5)}
                        placeholder="5번 보기 작성"
                    />
                    <input
                        type="checkbox"
                        name="question_answer_checkbox"
                        value={5}
                        checked={answer != undefined && answer.includes(5)}
                        onChange={(e) => onChangeInputAnswer(e, 5)}
                    />
                    <br />
                </div>
            </form>

            <Fab variant="extended" onClick={onClickBtnSave}>
                현재 문제 저장
            </Fab>
        </div>
    );
};

export default CreateEditExamQuestion;
