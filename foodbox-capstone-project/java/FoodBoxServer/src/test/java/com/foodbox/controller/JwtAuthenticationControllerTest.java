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

import com.foodbox.model.DAOUser;
import com.foodbox.model.Product;

@SpringBootTest
@AutoConfigureMockMvc
public class JwtAuthenticationControllerTest {
	
	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private JwtAuthenticationController jwtAuthenticationController;
		
	
	@Test
	void register() throws Exception {
		System.out.println("--- This is a Register call");
		DAOUser user = new DAOUser();
		user.setName("Sonali");
		user.setUsername("dipali@gmail.com");
		user.setPassword("testing123");
		user.setRole("admin");
		
        mockMvc.perform(post("/register")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(user)))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.fieldErrors", hasSize(2)))
                .andExpect(jsonPath("$.fieldErrors[*].path", containsInAnyOrder("title", "description")))
                .andExpect(jsonPath("$.fieldErrors[*].message", containsInAnyOrder(
                        "The maximum length of the description is 500 characters.",
                        "The maximum length of the title is 100 characters."
                )));
	}
	
	
	@Test
	void authenticate() throws Exception {
		System.out.println("--- This is a authenticate call");

        mockMvc.perform(post("/authenticate")
        		.param("username", "dipalik27@gmail.com")
                .param("password", "testing123")
                ).andDo(print())
        .andExpect(status().isOk());
   
	}
	
}
