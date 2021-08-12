package com.maple.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.maple.entity.ClothingItem;

@Repository
public interface ClothingRepository extends JpaRepository<ClothingItem, Integer> {

	@Query("SELECT C FROM ClothingItem C WHERE C.status = 'For Sale'")
	List<ClothingItem> findAllClothingItems();
	
	@Query("SELECT C FROM ClothingItem C WHERE C.id = ?1")
	ClothingItem findClothingItem(int id);
	
	@Transactional
	@Modifying
	@Query("UPDATE ClothingItem C SET C.quantity = ?1, C.status = ?2 WHERE C.id = ?3")
	void updateInventory(int quantity, String status, int id);
	
}
