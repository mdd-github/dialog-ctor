import {useThreadStore} from "../../../store/thread";
import {EmptyThreadPlaceholder} from "./EmptyThreadPlaceholder";
import {ThreadMessage} from "./ThreadMessage";

export const MessagesList = () => {
    const messages = useThreadStore(state => state.messages);

    return (
        <div className="thread_message-list-wrapper">
            <div className="thread_message-list">
                {
                    messages.length === 0 && <EmptyThreadPlaceholder />
                }
                {
                    messages.length !== 0 && (
                        messages.map((message) => <ThreadMessage key={message.id} message={message} />)
                    )
                }
            </div>
        </div>
    )
}