package ru.darlin.smartdeltasystems.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;

@Controller
@RequestMapping("/")
public class HomeController {

    @GetMapping("/")
    public void redirectToFrontend(HttpServletResponse response) throws IOException {
        response.sendRedirect("https://localhost");
    }
}
