package com.codecool.askmateoop.dao;

import com.codecool.askmateoop.controller.dto.NewAnswerDTO;
import com.codecool.askmateoop.dao.model.Answer;

import java.util.List;

public interface AnswerDAO {
    List<Answer> getAllAnswers(int questionId);

    NewAnswerDTO addNewAnswer(NewAnswerDTO newAnswerDTO);
    boolean deleteAnswer(int answerId);
}
