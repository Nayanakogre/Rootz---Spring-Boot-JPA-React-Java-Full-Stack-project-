package com.xworkz.rootz.resources;

import com.xworkz.rootz.dto.user.UserDto;
import com.xworkz.rootz.service.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/rootz")
//@CrossOrigin(origins = "http://localhost:5173")



@AllArgsConstructor

public class UserController {

    private final UserService service;



    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserDto dto) {
        System.out.println(dto);
        boolean isSaved = service.signupSave(dto);
        if (isSaved) {
            return ResponseEntity.ok("Signup Successful");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Signup Failed");
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDto dto) {
        UserDto user = service.login(dto.getEmail(), dto.getPassword());

        if (user != null) {
            return ResponseEntity.ok(user); // contains role, name, etc.
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
    @GetMapping("/check-email")
    public ResponseEntity<Map<String, Boolean>> checkEmailExists(@RequestParam String email) {
        boolean exists = service.isEmailRegistered(email);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        System.out.println("Forgot Password request for email: " + email);

        String message = service.processForgotPassword(email);

        return ResponseEntity.ok(Map.of("message", message));
    }


    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");

        boolean isValid = service.verifyOtp(email, otp);

        if (isValid) {
            return ResponseEntity.ok(Map.of("message", "OTP verified successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Invalid or expired OTP"));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String newPassword = request.get("newPassword");

        boolean updated = service.resetPassword(email, newPassword);

        if (updated) {
            return ResponseEntity.ok(Map.of("message", "Password updated successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Password reset failed"));
        }
    }


    @PostMapping("/edit-profile")
    public ResponseEntity<?> editProfile(
            @ModelAttribute UserDto dto) {
        System.out.println(dto);
        Boolean update=service.isEmailRegistered(dto.getEmail());
//        boolean updated = service.updateUser(dto);
        if (update) {
            boolean updated = service.updateUser(dto);
            return ResponseEntity.ok("Updted Successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Update Failed");
        }
    }


    // Separate endpoint just for profile image upload
    @PostMapping("/upload-profile-image")
    public ResponseEntity<String> uploadProfileImage(
            @RequestParam("email") String email,
            @RequestParam("imageFile") MultipartFile imageFile) {
        boolean updated = service.updateUserProfileImage(email, imageFile);
        if (updated) {
            return ResponseEntity.ok("Profile image updated successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to update profile image");
        }
    }


    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String currentPassword = request.get("currentPassword");
        String newPassword = request.get("newPassword");

        boolean changed = service.changePassword(email, currentPassword, newPassword);

        if (changed) {
            return ResponseEntity.ok(Map.of("message", "Password updated successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Current password is incorrect"));
        }
    }
    @GetMapping("/profile/{email}")
    public boolean getUserProfile(@PathVariable String email) {
        return service.isEmailRegistered(email);
    }






}
