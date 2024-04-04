import {useThreadStore} from "../../../store/thread";
import {EmptyThreadPlaceholder} from "./EmptyThreadPlaceholder";
import {ThreadMessage} from "./ThreadMessage";
import {THREAD_MESSAGE_MODE} from "../../../constants";

export const MessagesList = ({messageInEdit, setMessageInEdit}) => {
    const messages = useThreadStore(state => state.messages);

    return (
        <div className="thread_message-list-wrapper">
            <div className="thread_message-list">
                { messages.length === 0 && <EmptyThreadPlaceholder /> }
                { messages.length !== 0 && (
                        messages.map((message) => <ThreadMessage
                            key={message.id}
                            message={message}
                            mode={messageInEdit === message.id ? THREAD_MESSAGE_MODE.EDIT : THREAD_MESSAGE_MODE.VIEW}
                            onEdit={() => setMessageInEdit(message.id)}
                            onDelete={() => messageInEdit === message.id && setMessageInEdit(null)}
                        />)
                )}
            </div>
        </div>
    )
}