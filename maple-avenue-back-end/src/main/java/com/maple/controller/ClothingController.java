package com.maple.controller;

import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.maple.entity.Address;
import com.maple.entity.ClothingItem;
import com.maple.entity.Orders;
import com.maple.entity.User;
import com.maple.repository.AddressRepository;
import com.maple.repository.ClothingRepository;
import com.maple.repository.UserRepository;
import com.maple.repository.OrderRepository;

@CrossOrigin
@RestController
public class ClothingController {

	@Autowired
	ClothingRepository clothingRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	AddressRepository addressRepository;
	@Autowired
	OrderRepository orderRepository;
	
	
//	@RequestMapping(value = "/saveClothingItem",
//			consumes = MediaType.APPLICATION_JSON_VALUE,
//			produces = MediaType.APPLICATION_JSON_VALUE,
//			method = RequestMethod.POST)
//	public void addClothingItem(@RequestBody ClothingItem clothingItem) {
//		clothingItem.setStatus("For Sale");
//		
//		clothingRepository.save(clothingItem);
//	}
	
	@RequestMapping(value = "/findAllClothingItems",
			produces = MediaType.APPLICATION_JSON_VALUE,
			method = RequestMethod.GET)
	public List<ClothingItem> findAllClothingItems(){
		List<ClothingItem> allClothingItems = clothingRepository.findAllClothingItems();
		
		return allClothingItems;
	}
	
	@RequestMapping(value = "/purchaseItem",
			method = RequestMethod.GET)
	public void purchaseItem(@RequestParam String email, @RequestParam String id) {
		
		User user = userRepository.findUserEmail(email);
		ClothingItem clothingItem = clothingRepository.findClothingItem(Integer.parseInt(id));
		Orders order = new Orders();
		order.setUser(user);
		order.setClothingItem(clothingItem);
		orderRepository.save(order);

		clothingItem.setQuantity(clothingItem.getQuantity() - 1);
		if(clothingItem.getQuantity() <= 0) {
			clothingItem.setStatus("Sold");
		} 
		clothingRepository.updateInventory(clothingItem.getQuantity(), clothingItem.getStatus(), clothingItem.getId());		
	}
	
	private static final Logger logger = LoggerFactory.getLogger(ClothingController.class);
	
	@PostMapping(value = "/upload")
	public ResponseEntity uploadFile(@RequestParam("file") MultipartFile itemPicture, @RequestParam("itemName") String itemName,
			@RequestParam("size") String size, @RequestParam("description") String description,
			@RequestParam("quantity") int quantity, @RequestParam("price") double price) {
		logger.info(String.format("File name '%s' uploaded successfully.", itemPicture.getOriginalFilename()));
		ClothingItem clothingItem = new ClothingItem();
		clothingItem.setStatus("For Sale");
		clothingItem.setPrice(price);
		clothingItem.setItemName(itemName);
		clothingItem.setQuantity(quantity);
		clothingItem.setSize(size);
		clothingItem.setDescription(description);
		try {
			clothingItem.setItemPicture(itemPicture.getBytes());
		} catch (IOException e) {
			e.printStackTrace();
		}
		clothingRepository.save(clothingItem);

		return ResponseEntity.ok().build();
	}
	
//	@RequestMapping(value = "/allOrders",
//			produces = MediaType.APPLICATION_JSON_VALUE,
//			method = RequestMethod.GET)
//	public List<Orders> saveAndFindOrders(@RequestParam("userId") int userId, @RequestParam("itemId") int itemId ){
//		User user = userRepository.findById(userId).get();
//		ClothingItem clothingItem = clothingRepository.findById(itemId).get();
//
//		Orders order = new Orders();
//		order.setUser(user);
//		order.setClothingItem(clothingItem);
//		orderRepository.save(order);
//		
//		List<Orders> allOrders = orderRepository.findAllOrders();
//		return allOrders;
//	}
	
	@RequestMapping(value = "/findAllOrders",
			produces = MediaType.APPLICATION_JSON_VALUE,
			method = RequestMethod.GET)
	public List<Orders> findAllOrders(){
		List<Orders> orders = orderRepository.findAllOrders();
		
		return orders;
	}
	
	@RequestMapping(value = "/declineOrder",
			produces = MediaType.APPLICATION_JSON_VALUE,
			method = RequestMethod.GET)
	public void declineOrder (@RequestParam int orderId) {
		// updates clothingItem quantity back up 1
		Orders order = orderRepository.findById(orderId).get();
		ClothingItem clothingItem = order.getClothingItem();
		clothingItem.setQuantity(clothingItem.getQuantity() + 1);
		if(clothingItem.getQuantity() <= 1) {
			clothingItem.setStatus("For Sale");
		} 
		clothingRepository.updateInventory(clothingItem.getQuantity(), clothingItem.getStatus(), clothingItem.getId());	
		// deletes from order table
		orderRepository.declineOrder(orderId);
	
	}
	
	@RequestMapping(value = "/approveOrder",
			produces = MediaType.APPLICATION_JSON_VALUE,
			method = RequestMethod.GET)
	public void approveOrder (@RequestParam int orderId) {
		Orders order = orderRepository.findById(orderId).get();
		order.setStatus("Approved");
		orderRepository.save(order);

	}
}
