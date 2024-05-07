package com.codecool.askmateoop.dao.model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class DatabaseConnection {
    private final String dbUrl;
    private final String dbUser;
    private final String dbPassword;

    public DatabaseConnection(String dbUrl, String dbUser, String dbPassword) {
        this.dbUrl = dbUrl;
        this.dbUser = dbUser;
        this.dbPassword = dbPassword;
    }

    public Connection getConnection() throws SQLException {
        Properties props = new Properties();
        props.setProperty("user", dbUser);
        props.setProperty("password", dbPassword);
        Connection conn = DriverManager.getConnection(dbUrl, props);
        return conn;
    }
}
