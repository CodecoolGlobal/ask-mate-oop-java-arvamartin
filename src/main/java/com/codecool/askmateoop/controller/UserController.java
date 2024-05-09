package com.codecool.askmateoop.controller;


import com.codecool.askmateoop.controller.dto.NewUserDTO;
import com.codecool.askmateoop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/")
    public NewUserDTO addNewUser(@RequestBody NewUserDTO user) {
        return userService.addNewUser(user);
    };

    @PostMapping("/login")
    public boolean login(@RequestBody NewUserDTO user) {return userService.loginUser(user);};
}
