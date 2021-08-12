package com.maple.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.maple.entity.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, String> {
	
//	@Query("SELECT A FROM Address A WHERE A.user_id = ?1")
//	Address findAddressById(int user_id);
	
	@Query("SELECT A FROM Address A")
	List<Address> findAllAddress();
	
	@Query("SELECT MAX(id) FROM Address A")
	 Address findLatest();


}
