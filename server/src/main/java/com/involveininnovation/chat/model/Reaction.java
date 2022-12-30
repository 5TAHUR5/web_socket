package com.involveininnovation.chat.model;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Reaction {


    private Emotion emotion;

    private int messageId;

}
