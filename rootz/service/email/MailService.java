package com.xworkz.rootz.service.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service

public class MailService {

    private final JavaMailSender mailSender;

    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendRegisterEmail(String email, String userName) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(email);
        simpleMailMessage.setFrom("kjnayana8@gmail.com");
        simpleMailMessage.setSubject("Project - Registration Confirmation");
        simpleMailMessage.setText("Hello " + userName + ",\n\nThank you for registering with our application!\n\nRegards,\nTeam");

        mailSender.send(simpleMailMessage);
    }
    public void sendOtpEmail(String toEmail, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("your-email@gmail.com");
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
}
