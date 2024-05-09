package com.codecool.askmateoop.dao;

import com.codecool.askmateoop.controller.dto.NewQuestionDTO;
import com.codecool.askmateoop.controller.dto.NewUserDTO;
import com.codecool.askmateoop.dao.model.DatabaseConnection;
import org.jetbrains.annotations.NotNull;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class UserDaoJdbc implements UserDAO {
    private DatabaseConnection databaseConnection;

    public UserDaoJdbc(DatabaseConnection databaseConnection) {
        this.databaseConnection = databaseConnection;
    }

    @Override
    public NewUserDTO addNewUser(@NotNull NewUserDTO user) {
        String sql = "INSERT INTO \"user\" (name) VALUES (?);";
        try(Connection conn = databaseConnection.getConnection();
            PreparedStatement statement = conn.prepareStatement(sql)
        ){
            statement.setString(1, user.name());
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return user;
    }
}
