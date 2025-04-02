package com.example.tomatomall.repository;

import com.example.tomatomall.po.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product,String>
{
    Product findByTitle(String title);

    Optional<Product> findById(Integer id);

    void deleteById(Integer id);
}
