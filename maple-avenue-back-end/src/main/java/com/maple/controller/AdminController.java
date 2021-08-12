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

import com.maple.entity.Admin;
import com.maple.repository.AdminRepository;

@CrossOrigin
@RestController
public class AdminController {
	
	@Autowired
	AdminRepository adminRepository;
	
	@RequestMapping(value = "/saveAdmin",
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE,
			method = RequestMethod.POST)
	public void submitAdminDetails(@RequestBody Admin admin) {
		
		adminRepository.save(admin);
	}
	
	@RequestMapping(value = "/findAdminEmail",
			produces = MediaType.APPLICATION_JSON_VALUE,
			method = RequestMethod.GET)
	public ResponseEntity<Optional<Admin>> findAdminEmail(String email) {
		Optional<Admin> admin = Optional.of(this.adminRepository.findAdminEmail(email));
		
		return new ResponseEntity<Optional<Admin>>(admin, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/loginAdmin",
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE,
			method = RequestMethod.POST)
	public ResponseEntity<Admin> loginAdmin(@RequestBody Admin admin) {
		Admin adminInfo = adminRepository.loginAdmin(admin.getEmail(), admin.getPassword());
		if(adminInfo != null) {
			return new ResponseEntity<Admin>(adminInfo, HttpStatus.OK);
		}
		return new ResponseEntity<Admin>(HttpStatus.UNAUTHORIZED);
	}
	
	@RequestMapping(value = "/findAllAdmin",
			produces = MediaType.APPLICATION_JSON_VALUE,
			method = RequestMethod.GET)
	public List<Admin> findAllAdmin() {
		List<Admin> admin = adminRepository.findAllAdmins();
		
		return admin;
	}

}
