package com.xworkz.rootz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.xworkz.rootz")
public class RootzApplication {

	public static void main(String[] args) {

		SpringApplication.run(RootzApplication.class, args);
		System.out.println("Running in Rootz application");
	}

}
