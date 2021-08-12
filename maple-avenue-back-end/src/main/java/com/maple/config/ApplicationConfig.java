package com.maple.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages="com.maple.repository")
@EntityScan(basePackages="com.maple.entity")
public class ApplicationConfig {

}
