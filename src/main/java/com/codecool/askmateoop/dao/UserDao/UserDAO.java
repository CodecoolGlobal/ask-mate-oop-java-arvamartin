package com.codecool.askmateoop.dao.UserDao;
import com.codecool.askmateoop.controller.dto.NewUserDTO;

public interface UserDAO {
    NewUserDTO addNewUser(NewUserDTO userDTO);
    boolean loginUser(NewUserDTO userDTO);
}
