import React from "react";
import {MessagesList} from "./components/MessagesList";
import {EditMessagePanel} from "./components/EditMessagePanel";
import {CreateMessagePanel} from "./components/CreateMessagePanel";

export const ThreadPage = () => {
    return (
        <div className="thread_page">
            <div className="thread_page-wrapper">
                <h1>Создание чата</h1>
                <MessagesList />

                <EditMessagePanel />
                <CreateMessagePanel />
            </div>
        </div>
    )
}