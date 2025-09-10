package com.xworkz.rootz.entity.user;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Entity
@Data
@Component
@RequiredArgsConstructor
@Table(name="user_deatils")


public class UserEntity {
    @Id
    @Column(name = "u_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(name = "u_name")
    private String name;
    @Column(name = "u_email")
    private String email;
    @Column(name = "u_phone")
    private String phone;
    @Column(name = "u_password")
    private String password;
    @Column(name = "u_role")
    private String role;
    @Column(name = "u_profile_photo")
    private String imagePath;
    @Column(name = "u_reset_otp")
    private String otp;




}
