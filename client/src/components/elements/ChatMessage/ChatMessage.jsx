import React, {useEffect, useState} from 'react';
import cl from "./ChatMessage.module.css"

const ChatMessage = ({sendReaction, username, chatMessage, receiveReaction}) => {
    const [countLikes, setCountLikes] = useState(0)
    const [countDislike, setCountDislikes] = useState(0)
    const isAuthor = username === chatMessage.senderName


    useEffect(() => {
        if (chatMessage.reactions) {
            let endCountLike = 0
            let endCountDislike = 0
            chatMessage.reactions.forEach((reaction) => {
                console.log(reaction)
                if (reaction.emotion === "LIKE") {
                    endCountLike += 1
                } else if (reaction.emotion === "DISLIKE") {
                    endCountDislike += 1
                }
            })
            setCountLikes(countLikes + endCountLike)
            setCountDislikes(countDislike + endCountDislike)
        }
    }, [])

    useEffect(() => {
        if (receiveReaction.messageId === chatMessage.id) {
            if (receiveReaction.emotion === "LIKE") {
                setCountLikes(countLikes + 1)
            } else if (receiveReaction.emotion === "DISLIKE") {
                setCountDislikes(countDislike + 1)
            }
        }
    }, [receiveReaction])

    return (
        <div className={`${cl.messageWrapper} ${isAuthor ? cl.myMessageWrapper : cl.overMessageWrapper}`}>
            <span className={`${cl.message}  ${isAuthor ? cl.myMessage : cl.overMessage}`}>
                {isAuthor ? null : <span className={cl.authorMessage}>{chatMessage.senderName}</span>}
                {chatMessage.message}
                <span className={`${cl.time} ${isAuthor ? cl.myTime : cl.overTime}`}>{chatMessage.date}</span>
                <div className={`${cl.reactions} ${isAuthor ? cl.myReactions : cl.overReactions}`}>
                    <div onClick={e => sendReaction(chatMessage.id, "LIKE")} className={cl.emotions}>
                        {countLikes} &#128077;
                    </div>
                    <div onClick={e => sendReaction(chatMessage.id, "DISLIKE")} className={cl.emotions}>
                        {countDislike} &#128078;
                    </div>
                </div>
            </span>
        </div>
    );
};

export default ChatMessage;