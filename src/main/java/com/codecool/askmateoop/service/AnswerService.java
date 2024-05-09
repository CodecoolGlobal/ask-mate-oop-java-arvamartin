package com.codecool.askmateoop.service;

import com.codecool.askmateoop.controller.dto.NewAnswerDTO;
import com.codecool.askmateoop.dao.AnswerDao.AnswersDAO;
import com.codecool.askmateoop.dao.model.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class AnswerService {

    private final AnswersDAO answersDAO;

    @Autowired
    public AnswerService(AnswersDAO answersDAO) {
        this.answersDAO = answersDAO;
    }

    public List<Answer> getAllAnswers(int questionId) throws SQLException {
        return answersDAO.getAllAnswers(questionId);
    }
public boolean deleteAnswer(int id) throws SQLException{
        return answersDAO.deleteAnswer(id);
}
    public NewAnswerDTO addNewAnswer(NewAnswerDTO answer) {
        return answersDAO.addNewAnswer(answer);
    }

}
