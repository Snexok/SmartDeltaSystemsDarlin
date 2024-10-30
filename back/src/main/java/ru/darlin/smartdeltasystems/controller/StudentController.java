package ru.darlin.smartdeltasystems.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.darlin.smartdeltasystems.dto.StudentDTO;
import ru.darlin.smartdeltasystems.entity.StudentEntity;
import ru.darlin.smartdeltasystems.service.StudentService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/student")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;

    @GetMapping
    public ResponseEntity<List<StudentEntity>> getAll() {

        return ResponseEntity.ok(studentService.getAll());
    }

    @PutMapping
//    @PostMapping - должен быть
    public ResponseEntity<StudentEntity> create(@RequestBody StudentDTO studentDTO) {
        return ResponseEntity.ok(studentService.create(studentDTO));
    }

    @PostMapping
//    @PutMapping - должен быть
    public ResponseEntity<StudentEntity> update(@RequestBody StudentDTO studentDTO) {
        return ResponseEntity.ok(studentService.update(studentDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        studentService.delete(id);
        return ResponseEntity.ok("ok");
    }
}
