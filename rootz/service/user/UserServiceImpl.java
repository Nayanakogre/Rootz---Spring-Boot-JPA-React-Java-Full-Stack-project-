package com.xworkz.rootz.service.user;

import com.xworkz.rootz.dto.user.UserDto;
import com.xworkz.rootz.entity.user.UserEntity;
import com.xworkz.rootz.repository.user.UserRepository;
import com.xworkz.rootz.service.email.MailService;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.jpa.domain.JpaSort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

@Service
@AllArgsConstructor

public class UserServiceImpl implements UserService {

    private final BCryptPasswordEncoder passwordEncoder;

    private final UserRepository repository;

    private final MailService mailService;
    private final BCryptPasswordEncoder decrypt;
    @Override
    public boolean signupSave(UserDto dto) {
        String encryptedPassword= passwordEncoder.encode(dto.getPassword());
        dto.setPassword(encryptedPassword);
        UserEntity entity=new UserEntity();
        BeanUtils.copyProperties(dto,entity);

        passwordEncoder.matches(dto.getPassword(),entity.getPassword());

        UserEntity saveEntity=repository.save(entity);
        if(saveEntity!=null && saveEntity.getId()!=0)
        {
            mailService.sendRegisterEmail(saveEntity.getEmail(),saveEntity.getName());
            return true;
        }
        return false;
    }

    @Override
    public UserDto login(String email, String password) {
        Optional<UserEntity> optional = repository.findByEmail(email);

        if (optional.isPresent()) {
            UserEntity entity = optional.get();
            if (passwordEncoder.matches(password, entity.getPassword())) {
                UserDto dto = new UserDto();
                BeanUtils.copyProperties(entity, dto);
                return dto;
            }
        }
        return null;
    }


        @Override
        public boolean isEmailRegistered(String email) {
            return repository.existsByEmail(email);
        }



    public boolean updateUser(UserDto dto) {
        Optional<UserEntity> optionalUser = repository.findByEmail(dto.getEmail());
        if (optionalUser.isPresent()) {
            UserEntity existingUser = optionalUser.get();

            // Update only the fields from DTO
            existingUser.setName(dto.getName());

            // Update image if present
            if (dto.getImagePath() != null && !dto.getImagePath().isEmpty()) {
                existingUser.setImagePath(dto.getImagePath());
            }

            // Password remains untouched
            // existingUser.setPassword(existingUser.getPassword());

            repository.save(existingUser);
            return true;
        }
        return false;
    }

    public String processForgotPassword(String email) {
        Optional<UserEntity> optionalUser = repository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            return "Email not registered.";
        }

        // Generate 6-digit OTP
        String otp = String.valueOf(100000 + new Random().nextInt(900000));
        System.out.println(otp);

        // Save OTP in DB
        UserEntity user = optionalUser.get();
        user.setOtp(otp);
        repository.save(user);

        // Send OTP Email
        mailService.sendOtpEmail(email, "Password Reset OTP", "Your OTP is: " + otp);

        return "OTP sent to your email.";
    }
    public boolean verifyOtp(String email, String otp) {
        Optional<UserEntity> optionalUser = repository.findByEmail(email);
        if (optionalUser.isPresent()) {
            UserEntity user = optionalUser.get();
            return otp.equals(user.getOtp()); // You can add expiry check here if needed
        }
        return false;
    }

    public boolean resetPassword(String email, String newPassword) {
        Optional<UserEntity> optionalUser = repository.findByEmail(email);
        if (optionalUser.isPresent()) {
            UserEntity user = optionalUser.get();
            String encryptedPassword = passwordEncoder.encode(newPassword); // BCrypt
            user.setPassword(encryptedPassword);
            user.setOtp(null); // Clear OTP after reset
            repository.save(user);
            return true;
        }
        return false;
    }
    @Override
    public boolean changePassword(String email, String currentPassword, String newPassword) {
        Optional<UserEntity> optionalUser =repository.findByEmail(email);
        if (optionalUser.isPresent()) {
            UserEntity user = optionalUser.get();

            // Assuming you are storing hashed passwords with BCrypt
            if (passwordEncoder.matches(currentPassword, user.getPassword())) {
                user.setPassword(passwordEncoder.encode(newPassword));
                repository.save(user);
                return true;
            } else {
                return false; // Current password incorrect
            }
        }
        return false; // User not found
    }
    @Override
    public boolean updateUserProfileImage(String email, MultipartFile imageFile) {
        Optional<UserEntity> optionalUser = repository.findByEmail(email);
        if (optionalUser.isPresent()) {
            UserEntity user = optionalUser.get();
            try {
                // Store outside JAR -> uploads folder inside project root
                String uploadDir = System.getProperty("user.dir") + "/uploads";
                File directory = new File(uploadDir);
                if (!directory.exists()) {
                    directory.mkdirs();
                }

                // Generate safe + unique filename
                String fileName = System.currentTimeMillis() + "_"
                        + imageFile.getOriginalFilename().replaceAll("\\s+", "_");

                Path filePath = Paths.get(uploadDir, fileName);
                Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                // Save relative path in DB (for frontend use)
                user.setImagePath("/uploads/" + fileName);
                repository.save(user);

                return true;
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return false;
    }








}






