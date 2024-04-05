import React, {useState} from "react";
import {MessagesList} from "./components/MessagesList";
import {EditMessagePanel} from "./components/EditMessagePanel";
import {CreateMessagePanel} from "./components/CreateMessagePanel";

export const ThreadPage = () => {
    const [messageInEdit, setMessageInEdit] = useState(null);

    return (
        <div className="thread_page">
            <div className="thread_page-wrapper">
                <h1>Создание чата</h1>
                <MessagesList messageInEdit={messageInEdit} setMessageInEdit={setMessageInEdit} />

                { messageInEdit !== null && <EditMessagePanel
                    messageId={messageInEdit}
                    onBlur={() => setMessageInEdit(null)}
                /> }
                { messageInEdit === null && <CreateMessagePanel /> }
            </div>
        </div>
    )
}