import React, { memo } from "react";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";

const PaperComponent = memo((props) => {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
});

export default PaperComponent;
