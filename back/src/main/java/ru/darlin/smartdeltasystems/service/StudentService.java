package ru.darlin.smartdeltasystems.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.darlin.smartdeltasystems.dto.StudentDTO;
import ru.darlin.smartdeltasystems.entity.StudentEntity;
import ru.darlin.smartdeltasystems.repository.StudentRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository repository;

    public List<StudentEntity> getAll() {
        return repository.findAll();
    }

    public StudentEntity create(StudentDTO studentDTO) {
        String[] splitFullName = studentDTO.getFullName().split(" ");
        StudentEntity student = StudentEntity.builder()
                .lastName(splitFullName[0])
                .name(splitFullName[1])
                .patronymic(splitFullName[2])
                .groupName(studentDTO.getGroupName())
                .avgRating(studentDTO.getAvgRating())
                .build();
        return repository.save(student);
    }

    public StudentEntity update(StudentDTO studentDTO) {
        String[] splitFullName = studentDTO.getFullName().split(" ");
        StudentEntity student = StudentEntity.builder()
                .id(studentDTO.getId())
                .lastName(splitFullName[0])
                .name(splitFullName[1])
                .patronymic(splitFullName[2])
                .groupName(studentDTO.getGroupName())
                .avgRating(studentDTO.getAvgRating())
                .build();
        return repository.save(student);
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
