package ru.darlin.smartdeltasystems.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "students")
public class StudentEntity {
    @Id
    @GeneratedValue
    private Long id;

    private String fullName;
    private String name;
    private String lastName;
    private String patronymic;
    private String groupName;
    private Float avgRating;
}
