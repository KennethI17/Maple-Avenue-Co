package com.maple.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.maple.entity.Orders;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Integer> {

//	@Query("SELECT O FROM Orders O WHERE O.user_id = ?1 and O.item_d = ?2")
//	Orders allOrders(int user_id, int item_id);
	
	@Query("SELECT O FROM Orders O WHERE O.status = null")
	List<Orders> findAllOrders(); 
	
	@Transactional
	@Modifying
	@Query("DELETE FROM Orders O WHERE O.id = ?1")
	void declineOrder(int orderId);

}
