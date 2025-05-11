import { message } from 'antd'

type ShowMessageType = "SUCCESS" | "ERROR" | "WARNING" | "INFO";
type ShowMessage = {
    text: string,
    type: ShowMessageType
}

export const showMessage = ({ text, type }: ShowMessage) => {
    const messageType = type.toLowerCase() as Lowercase<ShowMessageType>;

    if (message[messageType]) {
        message[messageType](text);
    } else {
        message.info(text);
    }
};