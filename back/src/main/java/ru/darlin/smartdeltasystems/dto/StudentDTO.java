package ru.darlin.smartdeltasystems.dto;

import lombok.Data;

@Data
public class StudentDTO {
    private Long id;
    private String fullName;
    private String name;
    private String secondName;
    private String patronymic;
    private String groupName;
    private Float avgRating;
}
