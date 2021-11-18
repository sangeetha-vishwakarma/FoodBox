package com.foodbox.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;


@Entity
public class Product {
	
	  @Id
	  @GeneratedValue(strategy = GenerationType.AUTO)
	  @Column( name = "product_id")
	  private long product_id;
	  
	  @NotBlank(message = "Product Name is a mandatory field")
	  private String product_name;
	  
	  private String description;
	  
	  private String image;
	  	  
	  @DecimalMin(value = "0.0", inclusive = false, message = "Invalid price value")
	  @Digits(integer=10, fraction=2, message = "Invalid price value")
	  private float price;	  

	  private boolean enabled = true;
	  
//	  @OneToOne(cascade = CascadeType.ALL)
//	  @JoinColumn(name="category_id")
//	  private Category product_category;
//	  
//      @ManyToMany(cascade = { CascadeType.ALL })
//	  @JoinTable(
//		        name = "Product_Purchase", 
//		        joinColumns = { @JoinColumn(name = "product_id") }, 
//		        inverseJoinColumns = { @JoinColumn(name = "purchase_id") }
//		    )
//	  private List<Purchase> purchases;
//
//	public List<Purchase> getPurchases() {
//		return purchases;
//	}
//
//	public void setPurchases(List<Purchase> purchases) {
//		this.purchases = purchases;
//	}

	public long getProduct_id() {
		return product_id;
	}

	public void setProduct_id(long product_id) {
		this.product_id = product_id;
	}

	public String getProduct_name() {
		return product_name;
	}

	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	@Override
	public String toString() {
		return "Product [product_id=" + product_id + ", product_name=" + product_name + ", description=" + description
				+ ", image=" + image + ", price=" + price + ", enabled=" + enabled + "]";
	}

	
//	public Category getProduct_category() {
//		return product_category;
//	}
//
//	public void setProduct_category(Category product_category) {
//		this.product_category = product_category;
//	}

	

	
	    

}
