package com.xworkz.rootz.service.user;

import com.xworkz.rootz.dto.user.UserDto;
import com.xworkz.rootz.entity.user.UserEntity;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    boolean signupSave(UserDto dto);
    UserDto login(String email, String password);
    boolean isEmailRegistered(String email);
//
    boolean updateUser(UserDto dto);
    public String processForgotPassword(String email);
    public boolean verifyOtp(String email, String otp);
    public boolean resetPassword(String email, String newPassword);
    public boolean changePassword(String email, String currentPassword, String newPassword);
    public boolean updateUserProfileImage(String email, MultipartFile imageFile);

}
