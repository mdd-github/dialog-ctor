import {useCallback, useEffect, useState} from "react";
import {ChatMessage} from "./components/ChatMessage";
import {useThreadStore} from "../../store/thread";
import {cloneDeep} from "../../utils";
import {AUTHOR_TYPE, QUESTION_TYPE} from "../../constants";

const MESSAGE_TYPE = Object.freeze({
    TYPING: 'typing',
    USER: 'user',
    CHARACTER: 'character'
})

export const ChatPage = () => {
    const messagesQueue = useThreadStore(state => state.messages);
    const [messages, setMessages] = useState([]);
    const [questionMessage, setQuestionMessage] = useState(null);

    const pushNextMessage = () => {
        const message = messagesQueue[messages.length];

        if (message.authorType === AUTHOR_TYPE.CHARACTER) {
            setMessages((prevState) => [
                ...prevState,
                {
                    id: message.id,
                    type: MESSAGE_TYPE.TYPING,
                    characterId: message.characterId
                }
            ]);

            setTimeout(() => {
                setMessages((prevState) => [
                    ...prevState.slice(0, -1),
                    {
                        id: message.id,
                        type: MESSAGE_TYPE.CHARACTER,
                        characterId: message.characterId,
                        content: message.content
                    }
                ]);
            }, 1500);
        } else {
            // берём предыдущее сообщение персонажа т.к. в нём вся информация о том, что должен ответить пользователь
            setQuestionMessage(messagesQueue[messages.length - 1]);
        }
    }

    useEffect(() => {
        if(messages.length === 0) {
            return;
        }

        if(messages.at(-1).type === MESSAGE_TYPE.CHARACTER) {
            pushNextMessage();
        }
    }, [messages])

    return (
        <div className="chat-page">
            <div className="chat-page_content">
                <h1>Проверка чата</h1>

                <div className="chat-page_messages-container">
                    {
                        messages.map((message) => (
                            <ChatMessage key={message.id} message={message}/>
                        ))
                    }
                </div>

                {messages.length === 0 && (
                    <div className="chat-page_inputs-container chat-page_inputs-container--buttons">
                        <button type="button" onClick={() => pushNextMessage()}>Начать</button>
                    </div>
                )}

                {questionMessage?.questionType === QUESTION_TYPE.TEXT && (
                    <div className="chat-page_inputs-container chat-page_inputs-container--text">
                        <textarea rows="3" placeholder="Введите сообщение и нажмите отправить..."
                                  onClick={() => pushNextMessage()}/>
                    </div>
                )}

                {questionMessage?.questionType === QUESTION_TYPE.SELECT && (
                    <div className="chat-page_inputs-container chat-page_inputs-container--buttons">
                        variants
                    </div>
                )}
            </div>
        </div>
    )
}