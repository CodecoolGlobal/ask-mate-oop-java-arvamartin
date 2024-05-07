package com.codecool.askmateoop.service;

import com.codecool.askmateoop.controller.dto.NewQuestionDTO;
import com.codecool.askmateoop.controller.dto.QuestionDTO;
import com.codecool.askmateoop.dao.QuestionsDAO;
import com.codecool.askmateoop.dao.model.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class QuestionService {

    private final QuestionsDAO questionsDAO;

    @Autowired
    public QuestionService(QuestionsDAO questionsDAO) {
        this.questionsDAO = questionsDAO;
    }

    public List<Question> getAllQuestions() throws SQLException {
        List<Question> allQuestions = questionsDAO.getAllQuestions();
        // TODO convert data to QuestionDTO
        return allQuestions;
    }

    public QuestionDTO getQuestionById(int id) {
        // TODO
        throw new UnsupportedOperationException();
    }

    public boolean deleteQuestionById(int id) {
        return questionsDAO.delete(id);
    }


    public NewQuestionDTO addNewQuestion(NewQuestionDTO question) {
        NewQuestionDTO newQuestion = questionsDAO.postQuestion(question);
        return newQuestion;
    }
}
