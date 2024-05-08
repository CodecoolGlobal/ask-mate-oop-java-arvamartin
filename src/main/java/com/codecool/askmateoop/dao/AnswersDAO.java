package com.codecool.askmateoop.dao;

import com.codecool.askmateoop.controller.dto.NewAnswerDTO;
import com.codecool.askmateoop.dao.model.Answer;

import java.util.List;

public interface AnswersDAO {
    NewAnswerDTO addNewAnswer(NewAnswerDTO answer);

    List<Answer> getAllAnswers(int questionId);
}