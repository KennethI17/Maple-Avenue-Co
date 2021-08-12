package com.maple.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.maple.entity.Address;
import com.maple.repository.AddressRepository;

@CrossOrigin
@RestController
public class AddressController {
	
	@Autowired
	AddressRepository AddressRepository;
	
	@RequestMapping(value="/saveAddress",
			consumes=MediaType.APPLICATION_JSON_VALUE,
			produces=MediaType.APPLICATION_JSON_VALUE,
			method=RequestMethod.POST)
	public void submitAddressDetails(@RequestBody Address Address) {
		AddressRepository.save(Address);
	}
	
	@RequestMapping(value="/findAddressId",
			produces=MediaType.APPLICATION_JSON_VALUE,
			method=RequestMethod.GET)
	public Address findAddressId(@RequestParam String id) {
		Address Address = AddressRepository.getById(id);
		return Address;
	}
	
	@GetMapping(value="/findAllAddress",
			produces=MediaType.APPLICATION_JSON_VALUE)
	public List<Address> findAllAddress() {
		
		List<Address> Address = this.AddressRepository.findAll();
		
		return Address;
	}
}
