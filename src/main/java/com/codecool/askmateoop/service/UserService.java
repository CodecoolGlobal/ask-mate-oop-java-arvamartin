package com.codecool.askmateoop.service;

import com.codecool.askmateoop.controller.dto.NewUserDTO;
import com.codecool.askmateoop.dao.UserDao.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserDAO userDAO;

    @Autowired
    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public NewUserDTO addNewUser(NewUserDTO user) {
        return userDAO.addNewUser(user);
    }

    public boolean loginUser(NewUserDTO user) {return userDAO.loginUser(user);}
}
