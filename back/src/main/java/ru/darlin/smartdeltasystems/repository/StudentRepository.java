package ru.darlin.smartdeltasystems.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import ru.darlin.smartdeltasystems.entity.StudentEntity;

public interface StudentRepository extends JpaRepository<StudentEntity, Long> {
    void deleteById(Long id);
}
