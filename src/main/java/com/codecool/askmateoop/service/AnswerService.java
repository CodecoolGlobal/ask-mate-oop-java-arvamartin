package com.codecool.askmateoop.service;

import com.codecool.askmateoop.controller.dto.NewAnswerDTO;
import com.codecool.askmateoop.dao.AnswerDAO;
import com.codecool.askmateoop.dao.AnswersDaoJdbc;
import com.codecool.askmateoop.dao.model.Answer;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class AnswerService {

    private final AnswerDAO answerDAO;



    public AnswerService(AnswerDAO answersDAO) {
        this.answerDAO = answersDAO;
    }

    public List<Answer> getAllAnswers(int questionId) throws SQLException {
        return answerDAO.getAllAnswers(questionId);
    }

    public NewAnswerDTO addNewAnswer(NewAnswerDTO answer) {
        NewAnswerDTO newAnswer = answerDAO.addNewAnswer(answer);
        return newAnswer;
    }

    public boolean deleteAnswer(int answerId){
        return answerDAO.deleteAnswer(answerId);
    }
}
