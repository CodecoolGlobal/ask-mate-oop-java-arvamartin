package com.codecool.askmateoop.dao;

import com.codecool.askmateoop.controller.dto.NewAnswerDTO;
import com.codecool.askmateoop.dao.model.Answer;
import com.codecool.askmateoop.dao.model.DatabaseConnection;
import com.codecool.askmateoop.dao.model.Question;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Repository;


import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class AnswersDaoJdbc implements AnswerDAO {

    private DatabaseConnection databaseConnection;

    public AnswersDaoJdbc(DatabaseConnection databaseConnection) {
        this.databaseConnection = databaseConnection;
    }

    public List<Answer> getAllAnswers(int questionId) {
        List<Answer> answers = new ArrayList<>();
        String sql = "SELECT id, description FROM \"answer\" WHERE question_id = ?;";
        try (Connection conn = databaseConnection.getConnection();
             PreparedStatement statement = conn.prepareStatement(sql)) {
            statement.setInt(1, questionId);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                int answerId = rs.getInt("id");
                String description = rs.getString("description");
                Answer answer = new Answer(answerId, questionId, description);
                answers.add(answer);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error retrieving answers for question ID: " + questionId, e);
        }
        return answers;
    }

    public NewAnswerDTO addNewAnswer(@NotNul NewAnswerDTO answer) {
        String sql = "INSERT INTO answers (question_id, description) VALUES (?, ?);";
        try (Connection conn = databaseConnection.getConnection();
             PreparedStatement statement = conn.prepareStatement(sql)) {
            statement.setInt(1, answer.getQuestionId());
            statement.setString(2, answer.getDescription());

            int affectedRows = statement.executeUpdate();
            if (affectedRows == 0) {
                throw new SQLException("Creating answer failed, no rows affected.");
            }
            return new NewAnswerDTO(answer.getQuestionId(), answer.getDescription());
        } catch (SQLException e) {
            throw new RuntimeException("Error posting answer for question ID: " + answer.getQuestionId(), e);
        }
    }

    public boolean deleteAnswer(int answerId) {
        String sql = "DELETE FROM answers WHERE id = ?;";
        try (Connection conn = databaseConnection.getConnection();
        PreparedStatement statement = conn.prepareStatement(sql)) {
            statement.setInt(1, answerId);
            int affectedRows = statement.executeUpdate();
            return affectedRows > 0;

        } catch (SQLException e) {
            throw new RuntimeException(e);

        }
    }

}
