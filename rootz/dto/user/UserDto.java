package com.xworkz.rootz.dto.user;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@RequiredArgsConstructor
@Component

public class UserDto {
    private String name;
    private String email;
    private String phone;
    private String password;
    private String role;
    private String imagePath;
    private String otp;
}
