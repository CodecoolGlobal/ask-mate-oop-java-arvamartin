package com.codecool.askmateoop.dao;

import com.codecool.askmateoop.dao.model.Question;

import java.sql.SQLException;
import java.util.List;

public interface QuestionsDAO {
    List<Question> getAllQuestions() throws SQLException;
}
