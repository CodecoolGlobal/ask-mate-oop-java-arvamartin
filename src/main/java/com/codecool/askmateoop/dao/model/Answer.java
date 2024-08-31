package com.codecool.askmateoop.dao.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "answer")
@Getter @Setter
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @Column(name = "description", nullable = false)
    private String description;

    protected Answer() {
    }


    public Answer(long id, long questionId, String description) {
        this.id = id;
        this.question = new Question();
        this.question.setId(questionId);
        this.description = description;
    }
}
