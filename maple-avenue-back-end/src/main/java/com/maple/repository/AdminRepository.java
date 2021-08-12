package com.maple.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.maple.entity.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, String> {
	
	@Query("SELECT A FROM Admin A WHERE A.email = ?1")
	Admin findAdminEmail(String email);
	
	@Query("SELECT A FROM Admin A WHERE A.email = ?1 and A.password = ?2")
	Admin loginAdmin(String email, String password);
	
	@Query("SELECT A FROM Admin A")
	List<Admin> findAllAdmins();

}
