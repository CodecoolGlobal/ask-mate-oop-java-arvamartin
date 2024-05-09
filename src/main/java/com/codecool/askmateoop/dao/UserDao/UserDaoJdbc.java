package com.codecool.askmateoop.dao.UserDao;

import com.codecool.askmateoop.controller.dto.NewUserDTO;
import com.codecool.askmateoop.dao.model.DatabaseConnection;
import org.jetbrains.annotations.NotNull;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserDaoJdbc implements UserDAO {
    private DatabaseConnection databaseConnection;

    public UserDaoJdbc(DatabaseConnection databaseConnection) {
        this.databaseConnection = databaseConnection;
    }

    @Override
    public NewUserDTO addNewUser(@NotNull NewUserDTO user) {
        String sql =  "INSERT INTO \"user\" (name, password) VALUES (?,?);";
        try(Connection conn = databaseConnection.getConnection();
            PreparedStatement statement = conn.prepareStatement(sql)
        ){
            statement.setString(1, user.getName());
            statement.setString(2, user.getPassword());
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return user;
    }

    @Override
    public boolean loginUser(NewUserDTO userDTO) {
        String sql = "SELECT * FROM \"user\" WHERE name = ? AND password = ?";
       try(Connection conn = databaseConnection.getConnection();
       PreparedStatement statement = conn.prepareStatement(sql)) {
           statement.setString(1, userDTO.getName());
           statement.setString(2, userDTO.getPassword());
           ResultSet rs = statement.executeQuery();
            if(rs.next()) {
                return true;
            }
       } catch (SQLException e) {
           throw new RuntimeException(e);
       }
        return false;
    }

}
