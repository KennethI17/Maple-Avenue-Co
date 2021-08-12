package com.maple.mapleavenuebackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages="com.maple")
public class MapleAvenueBackEndApplication {

	public static void main(String[] args) {
		SpringApplication.run(MapleAvenueBackEndApplication.class, args);
	}

}
