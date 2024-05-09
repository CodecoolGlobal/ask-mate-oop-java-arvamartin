package com.codecool.askmateoop.controller.dto;

public record NewUserDTO(String name, String password) {
    public String getPassword() {
        return password;
    }
    public String getName() {
        return name;
    }
}
