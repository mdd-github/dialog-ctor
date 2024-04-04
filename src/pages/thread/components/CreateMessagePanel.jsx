import {useThreadStore} from "../../../store/thread";
import {AUTHOR_TYPE} from "../../../constants";


export const CreateMessagePanel = () => {
    const createMessage = useThreadStore(state => state.createMessage);

    return (
        <div className="thread_create-message">
            <button
                type="button"
                className="thread_create-message_button"
                onClick={() => createMessage(AUTHOR_TYPE.CHARACTER)}
            >
                Добавить реплику персонажа
            </button>
            <button
                type="button"
                className="thread_create-message_button"
                onClick={() => createMessage(AUTHOR_TYPE.USER)}
            >
                Добавить ответ пользователя
            </button>
        </div>
    )
}