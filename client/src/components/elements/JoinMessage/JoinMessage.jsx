import React from 'react';
import cl from "./JoinMessage.module.css"

const JoinMessage = ({chatMessage}) => {

    return (
        <div className={cl.messageWrapper}>
            <div className={cl.message}>
                {chatMessage.senderName} присоеденился!
            </div>
        </div>
    );
};

export default JoinMessage;