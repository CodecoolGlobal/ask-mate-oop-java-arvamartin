package com.codecool.askmateoop.dao;

import com.codecool.askmateoop.controller.dto.NewQuestionDTO;
import com.codecool.askmateoop.dao.model.Question;

import java.sql.SQLException;
import java.util.List;

public interface QuestionsDAO {
    List<Question> getAllQuestions() throws SQLException;
    NewQuestionDTO postQuestion(NewQuestionDTO question);

    boolean delete(int id);
}
