package com.involveininnovation.chat.controller;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.involveininnovation.chat.model.Message;

import java.util.ArrayList;


@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class RestChatController {

    @GetMapping("/getMessages")
    @CrossOrigin(origins = "*", maxAge = 3600)
    public ArrayList<Message> getMessages() {
        return ChatController.messages;
    }

}
