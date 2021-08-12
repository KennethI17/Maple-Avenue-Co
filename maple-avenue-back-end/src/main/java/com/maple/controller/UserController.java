package com.maple.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.maple.entity.User;
import com.maple.repository.UserRepository;


@CrossOrigin
@RestController
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	
	
	@RequestMapping(value = "/saveUser",
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE,
			method = RequestMethod.POST)
	public void submitUserDetails(@RequestBody User user) {
		
		userRepository.save(user);
	}
	
	@RequestMapping(value = "/findUserEmail",
			produces = MediaType.APPLICATION_JSON_VALUE,
			method = RequestMethod.GET)
	public ResponseEntity<Optional<User>> findUserEmail(String email) {
		
		Optional<User> user = Optional.of(this.userRepository.findUserEmail(email));
		
		return new ResponseEntity<Optional<User>>(user, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/loginUser",
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE,
			method = RequestMethod.POST)
	public ResponseEntity<User> loginUser(@RequestBody User user) {
		User userInfo = userRepository.loginUser(user.getEmail(), user.getPassword());
		if(userInfo != null) {
			return new ResponseEntity<User>(user, HttpStatus.OK);
		}
		return new ResponseEntity<User>(HttpStatus.UNAUTHORIZED);
	}
	
	@RequestMapping(value = "/findAllUsers",
			produces = MediaType.APPLICATION_JSON_VALUE,
			method = RequestMethod.GET)
	public List<User> findAllUsers(){
		List<User> allUsers = userRepository.findAllUsers();
		
		return allUsers;
	}
	
}
