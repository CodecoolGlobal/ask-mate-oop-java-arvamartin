package com.codecool.askmateoop.controller;


import com.codecool.askmateoop.controller.dto.NewAnswerDTO;
import com.codecool.askmateoop.controller.dto.NewQuestionDTO;
import com.codecool.askmateoop.dao.model.Answer;
import com.codecool.askmateoop.dao.model.Question;
import com.codecool.askmateoop.service.AnswerService;
import com.codecool.askmateoop.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("api/answer")
public class AnswerController {

    private final AnswerService answerService;

    @Autowired
    public AnswerController(AnswerService answerService){
        this.answerService = answerService;
    }

    @GetMapping("/all/{id}")
    public List<Answer> getAllAnswers(@PathVariable("id") int questionId) throws SQLException {
        return answerService.getAllAnswers(questionId);
    }

    @PostMapping("/{id}")
    public NewAnswerDTO addNewAnswer(@PathVariable("id") @RequestBody NewAnswerDTO answer) {
        return answerService.addNewAnswer(answer);
    }
}
