package com.maple.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.maple.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	
	@Query("SELECT U FROM User U WHERE U.email = ?1")
	User findUserEmail(String email);
	
	@Query("SELECT U FROM User U WHERE U.email = ?1 and U.password = ?2")
	User loginUser(String email, String password);
	
	@Query("SELECT U FROM User U")
	List<User> findAllUsers();

}