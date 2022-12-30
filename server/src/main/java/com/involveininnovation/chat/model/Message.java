package com.involveininnovation.chat.model;

import lombok.*;

import java.util.ArrayList;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Message {

    private int id;
    private String senderName;
    private String message;
    private String date;
    private Status status;

    private ArrayList<Reaction> reactions;

}
