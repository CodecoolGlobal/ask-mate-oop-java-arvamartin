package com.codecool.askmateoop.service;

import com.codecool.askmateoop.controller.dto.NewAnswerDTO;
import com.codecool.askmateoop.dao.AnswersDaoJdbc;
import com.codecool.askmateoop.dao.model.Answer;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class AnswerService {

    private final AnswersDaoJdbc answersDaoJdbc;

    public AnswerService(AnswersDaoJdbc answersDaoJdbc) {
        this.answersDaoJdbc = answersDaoJdbc;
    }

    public List<Answer> getAllAnswers(int questionId) throws SQLException {
        return answersDaoJdbc.getAllAnswers(questionId);
    }

    public NewAnswerDTO addNewAnswer(NewAnswerDTO answer) {
        NewAnswerDTO newAnswer = answersDaoJdbc.addNewAnswer(answer);
        return newAnswer;
    }
}
