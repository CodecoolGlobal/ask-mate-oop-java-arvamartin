package com.codecool.askmateoop.dao.model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "question")
@Getter @Setter
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "created")
    private LocalDateTime created;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<Answer> answers;

    protected Question() {
    }


    public Question(long id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.created = LocalDateTime.now();
    }


}