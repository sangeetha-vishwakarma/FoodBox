package com.foodbox.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import static org.hamcrest.Matchers.*;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import io.restassured.RestAssured;
import io.restassured.specification.RequestSpecification;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.foodbox.model.Product;

@SpringBootTest
@AutoConfigureMockMvc
public class ProductControllerTest {
	
	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private ProductController productController;
		
	
	@Test
	void getAllProducts() throws Exception {
		System.out.println("--- This is a getAllProducts call");
		 this.mockMvc.perform(MockMvcRequestBuilders
		            .get("/{id}", "10")
		            .contentType(APPLICATION_JSON))
		            .andExpect(status().isOk());
	}
	
	
	@Test
	void getProductById() throws Exception {
		System.out.println("--- This is a getProductById call");

		this.mockMvc.perform(get("/{10}")).andDo(print()).andExpect(status().isOk());

	}
	
	@Test
	void deleteProductById() throws Exception {
		System.out.println("--- This is a deleteProductById call");
		
		    this.mockMvc.perform(MockMvcRequestBuilders
		            .delete("/{id}", "11")
		            .contentType(APPLICATION_JSON))
		            .andExpect(status().isOk());
				
	}
	
	@Test
	void saveProduct() throws Exception {
		System.out.println("--- This is a saveProduct call");
		
		Product product = new Product();
		product.setProduct_name("test product");
		product.setDescription("testDewcription");
		product.setPrice(1000);
		product.setEnabled(true);
		product.setImage("//testimage.jpg");
		
        mockMvc.perform(post("/")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(product)))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.fieldErrors", hasSize(2)))
                .andExpect(jsonPath("$.fieldErrors[*].path", containsInAnyOrder("title", "description")))
                .andExpect(jsonPath("$.fieldErrors[*].message", containsInAnyOrder(
                        "The maximum length of the description is 500 characters.",
                        "The maximum length of the title is 100 characters."
                )));
 
	}

}
