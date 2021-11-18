package com.foodbox.service;

import java.util.List;
import javax.validation.Valid;

import org.springframework.stereotype.Service;

import com.foodbox.model.Product;


public interface ProductService {

	public List<Product> getAllProducts();

	public Product save(Product Product);

	public void deleteById(Long id);

	public void update(@Valid Product Product);

	public Product findById(Long id);	
	
}
