package com.ogl.devtest.customer;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.ogl.devtest.interfaces.CityCount;

import java.util.Optional;
import java.util.List;

public interface customerRepository extends CrudRepository<Customer, Long> {
  Optional<Customer> findByName(String name);

  @Query("SELECT c.city AS city, COUNT(c) AS count " +
      "FROM Customer c " +
      "GROUP BY c.city")
  List<CityCount> countCustomersByCity();
}
