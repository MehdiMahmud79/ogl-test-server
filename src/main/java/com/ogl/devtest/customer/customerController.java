package com.ogl.devtest.customer;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/customer")
public class customerController {

  private final customerRepository customerRepository;

  public customerController(customerRepository customerRepository) {
    this.customerRepository = customerRepository;
  }

  @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
  public Iterable<Customer> findAll() {
    return customerRepository.findAll();
  }

  @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Customer> findById(@PathVariable("id") long id) {
    final Optional<Customer> customer = customerRepository.findById(id);

    return customer.isPresent() ? ResponseEntity.of(customer) : ResponseEntity.notFound().build();
  }

  @GetMapping(value = "/name/{name}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Customer> findByName(@PathVariable("name") String name) {
    final Optional<Customer> customer = customerRepository.findByName(name);

    return customer.isPresent() ? ResponseEntity.of(customer) : ResponseEntity.notFound().build();
  }

  @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Customer> save(@RequestBody Customer customer) {
    return ResponseEntity.ok(customerRepository.save(customer));
  }
  @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Customer> updateCustomer(@PathVariable("id") long id, @RequestBody Customer updatedCustomer) {
    Optional<Customer> existingCustomerOpt = customerRepository.findById(id);

    if (!existingCustomerOpt.isPresent()) {
        return ResponseEntity.notFound().build();  // Customer with this ID does not exist
    }

    Customer existingCustomer = existingCustomerOpt.get();
    
    existingCustomer.setName(updatedCustomer.getName());
    
    Customer savedCustomer = customerRepository.save(existingCustomer);
    return ResponseEntity.ok(savedCustomer);
}
}
