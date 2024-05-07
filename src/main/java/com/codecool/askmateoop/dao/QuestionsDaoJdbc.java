package com.codecool.askmateoop.dao;

import com.codecool.askmateoop.controller.dto.NewQuestionDTO;
import com.codecool.askmateoop.dao.model.DatabaseConnection;
import com.codecool.askmateoop.dao.model.Question;
import org.jetbrains.annotations.NotNull;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class QuestionsDaoJdbc implements QuestionsDAO {

    private DatabaseConnection databaseConnection;

    public QuestionsDaoJdbc(DatabaseConnection databaseConnection) {
        this.databaseConnection = databaseConnection;
    }

    @Override
    public List<Question> getAllQuestions() {
        List<Question> questions = new ArrayList<>();
        String sql = "SELECT id, title, description FROM \"question\"";
        try (Connection conn = databaseConnection.getConnection();
             Statement statement = conn.createStatement();
             ResultSet rs = statement.executeQuery(sql);
        ) {
            while (rs.next()) {
                int id = rs.getInt("id");
                String title = rs.getString("title");
                String description = rs.getString("description");
                Question question = new Question(id, title, description);
                questions.add(question);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return questions;
    }

    @Override
    public NewQuestionDTO postQuestion(@NotNull NewQuestionDTO question) {
        String sql = "INSERT INTO question (title, description) VALUES (?,?);";
        try(Connection conn = databaseConnection.getConnection();
            PreparedStatement statement = conn.prepareStatement(sql)
        ){
            statement.setString(1, question.getTitle());
            statement.setString(2, question.getDescription());

            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return question;
    }
    @Override
    public boolean delete(int id) {
        String sql = "DELETE FROM question WHERE id = ?;";
        try (Connection conn = databaseConnection.getConnection();
             PreparedStatement statement = conn.prepareStatement(sql)) {
            statement.setInt(1, id);
            int rowsAffected = statement.executeUpdate();
            // Check if any rows were affected by the delete operation
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Question getQuestion(int id) {
        String sql = "SELECT title, description FROM question WHERE id = ?;";
        try (Connection conn = databaseConnection.getConnection()) {
            PreparedStatement statement = conn.prepareStatement(sql);
            statement.setInt(1, id);
            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                String title = rs.getString("title");
                String description = rs.getString("description");
                return new Question(id, title, description);
            } else {
                // No question found with the given ID
                return null;
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}

