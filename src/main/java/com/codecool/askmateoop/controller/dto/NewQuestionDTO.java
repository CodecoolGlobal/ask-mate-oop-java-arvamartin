package com.codecool.askmateoop.controller.dto;

public record NewQuestionDTO(String title, String description) {

    public String getTitle(){
        return title;
    }
    public String getDescription(){
        return description;
    }
}
