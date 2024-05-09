package com.codecool.askmateoop.dao;
import com.codecool.askmateoop.controller.dto.NewUserDTO;

public interface UserDAO {
    NewUserDTO addNewUser(NewUserDTO userDTO);
}
