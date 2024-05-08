package com.codecool.askmateoop.controller.dto;

public record NewAnswerDTO(int questionId, String description) {

    public int getQuestionId(){
        return questionId;
    }
    public String getDescription(){
        return description;
    }
}
