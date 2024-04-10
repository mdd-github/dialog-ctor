import {useEffect, useState} from "react";
import {ChatMessage} from "./components/ChatMessage";
import {useThreadStore} from "../../store/thread";
import {AUTHOR_TYPE, MESSAGE_TYPE, QUESTION_TYPE} from "../../constants";

export const ChatPage = () => {
    const messagesQueue = useThreadStore(state => state.messages);
    const [messages, setMessages] = useState([]);
    const [questionMessage, setQuestionMessage] = useState(null);

    const pushNextMessage = () => {
        if(messagesQueue.length === messages.length) {
            setMessages([
                ...messages,
                {
                    id: messages.length,
                    type: MESSAGE_TYPE.SYSTEM,
                    content: 'Чат окончен'
                }
            ]);
            return;
        }

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

        if(messages.at(-1).type === MESSAGE_TYPE.CHARACTER || messages.at(-1).type === MESSAGE_TYPE.USER) {
            pushNextMessage();
        }
    }, [messages])

    const [userMessage, setUserMessage] = useState('');
    const sendUserMessage = (content) => {
        setMessages([
            ...messages,
            {
                id: messages.length,
                type: MESSAGE_TYPE.USER,
                content
            }
        ]);
        setUserMessage('');
        setQuestionMessage(null);
    }

    return (
        <div className="chat-page">
            <div className="chat-page_content">
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
                        <textarea
                            rows="3"
                            placeholder="Введите сообщение и нажмите отправить..."
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                        />
                        <button type="button" onClick={() => sendUserMessage(userMessage)}>Отправить</button>
                    </div>
                )}

                {questionMessage?.questionType === QUESTION_TYPE.SELECT && (
                    <div className="chat-page_inputs-container chat-page_inputs-container--buttons">
                        {
                            questionMessage.questionVariants.map(variant => (
                                <button
                                    key={variant.id}
                                    type="button"
                                    onClick={() => sendUserMessage(variant.content)}
                                >
                                    {variant.content}
                                </button>
                            ))
                        }
                    </div>
                )}

                {messages.length > 0 && (messages.at(-1).type === MESSAGE_TYPE.TYPING || messages.at(-1).type === MESSAGE_TYPE.SYSTEM) && (
                    <div className="chat-page_inputs-container chat-page_inputs-container--waiting">
                        <textarea
                            disabled={true}
                            rows="3"
                            placeholder=""
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                        />
                        <button disabled={true} type="button" onClick={() => sendUserMessage(userMessage)}>Отправить</button>
                    </div>
                )}
            </div>
        </div>
    )
}