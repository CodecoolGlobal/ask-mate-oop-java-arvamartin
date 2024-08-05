package com.codecool.askmateoop.configuration;

import com.codecool.askmateoop.dao.*;
import com.codecool.askmateoop.dao.model.DatabaseConnection;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Value("${spring.datasource.url}")
    private String databaseUrl;

    @Value("${spring.datasource.username}")
    private String databaseUsername;

    @Value("${spring.datasource.password}")
    private String databasePassword;

    @Bean
    public DatabaseConnection databaseConnection() {
        return new DatabaseConnection(databaseUrl, databaseUsername, databasePassword);
    }

    @Bean
    public QuestionsDAO questionsDAO(DatabaseConnection databaseConnection) {
        return new QuestionsDaoJdbc(databaseConnection);
    }

    @Bean
    public AnswersDAO answersDAO(DatabaseConnection databaseConnection) {
        return new AnswersDaoJdbc(databaseConnection);
    }

    @Bean
    public UserDAO userDAO(DatabaseConnection databaseConnection) {
        return new UserDaoJdbc(databaseConnection);
    }
}