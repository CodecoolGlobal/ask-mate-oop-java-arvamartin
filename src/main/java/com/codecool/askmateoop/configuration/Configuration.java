package com.codecool.askmateoop.configuration;

import com.codecool.askmateoop.dao.*;
import com.codecool.askmateoop.dao.model.DatabaseConnection;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.context.annotation.Bean;

@SpringBootConfiguration
public class Configuration {

    @Value("${askmate.database.url}")
    private String databaseUrl;

    @Value("${askmate.database.username}")
    private String databaseUsername;

    @Value("${askmate.database.password}")
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

