package com.involveininnovation.chat.controller;

import com.involveininnovation.chat.model.Message;
import com.involveininnovation.chat.model.Reaction;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Set;


@Controller
public class ChatController {

    public static final ArrayList<Message> messages = new ArrayList<>();


    @MessageMapping("/message")
    @SendTo("/chat")
    public Message receiveMessage(@Payload Message message) {
        message.setId(messages.size());
        message.setDate("12:45");
        message.setReactions(new ArrayList<>());
        messages.add(message);
        return message;
    }

    @MessageMapping("/reaction")
    @SendTo("/emotions")
    public Reaction recMessage(@Payload Reaction reaction) {
        Message message = messages.get(reaction.getMessageId());
        System.out.println(message.toString());
        message.getReactions().add(reaction);
        System.out.println(message.toString());
        messages.set(message.getId(), message);
        return reaction;
    }

}
