import React, { useState, useEffect, useRef, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import Fab from "@mui/material/Fab";

const CreateEditExamQuestion = ({
    // currentQuestion,
    currentQuestionIndex,
    questionList,
    setQuestionList
}) => {
    const isNewQuestion =
        questionList[currentQuestionIndex - 1]?.content == undefined;
    // const isNewQuestion = currentQuestion?.content == undefined;

    // content, pictureURL, answer(배열), choice(객체)
    const [content, setContent] = useState("");
    const [pictureURL, setPictureURL] = useState("");
    const [answer, setAnswer] = useState([]);
    const [choice, setChoice] = useState(null);

    const onClickBtnSave = (e) => {
        alert("현재 문제 저장");
    };

    return (
        <div className="create_edit_exam_question">
            <form>
                <textarea name="">zz</textarea>
                <input type="file" accept=".jpg,.jpeg,.pdf" />
            </form>

            {isNewQuestion ? (
                <h2>새로운 문제 추가</h2>
            ) : (
                <h2>기존 문제 수정</h2>
            )}

            <Fab variant="extended" onClick={onClickBtnSave}>
                저 장
            </Fab>
        </div>
    );
};

export default CreateEditExamQuestion;
