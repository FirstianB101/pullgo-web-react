import React from "react";

const QuestionIndexPanel = ({
    savedAttenderAnswerList,
    currentQuestionIndex,
    setCurrentQuestionIndex
}) => {
    const getTdElement = (questionIndex) => {
        if (questionIndex >= savedAttenderAnswerList.length) return;

        const td = (
            <td>
                <button>{questionIndex + 1}</button> O
            </td>
        );
        return td;
    };

    const testShowTableItems = () => {
        const tableItems = [];

        for (let i = 0; i < savedAttenderAnswerList.length; i++) {
            const tr = (
                <tr>
                    <td>{i + 1}번</td>
                </tr>
            );
            tableItems.push(tr);
        }

        console.log(tableItems);

        return tableItems;
    };

    const showTableItems = () => {
        if (savedAttenderAnswerList.length === 0) return;

        const tableItems = [];

        const numOfTr = Math.ceil(savedAttenderAnswerList.length / 5);
        let questionIndex = 0; // 0 ~ savedAttenderAnswerList.length - 1
        let tdElements = [];

        for (let i = 0; i < numOfTr; i++) {
            if (questionIndex >= savedAttenderAnswerList.length) return;

            const td = getTdElement(questionIndex);
            tdElements.push(td);
            questionIndex++;
            console.log(questionIndex);
            console.log(i);

            if (questionIndex != 0 && (questionIndex + 1) % 5 == 0) {
                const tr = (
                    <tr key={questionIndex}>
                        {tdElements[0] ? tdElements[0] : null}
                        {tdElements[1] ? tdElements[1] : null}
                        {tdElements[2] ? tdElements[2] : null}
                        {tdElements[3] ? tdElements[3] : null}
                        {tdElements[4] ? tdElements[4] : null}
                    </tr>
                );

                console.log(tdElements);
                tableItems.push(tr);
                tdElements = [];
            }
        }

        console.log(tableItems);
        return tableItems;
    };

    return (
        <div className="question_index_panel">
            <table>{showTableItems()}</table>
            {/* <table>{testShowTableItems()}</table> */}
        </div>
    );
};

export default QuestionIndexPanel;
