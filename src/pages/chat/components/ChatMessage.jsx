import {memo} from "react";


export const ChatMessage = memo(({message}) => {
    return (
        <div className="chat-message_wrapper">
            {message.content}

            {message.type === 'typing' && 'typing'}
        </div>
    )
});