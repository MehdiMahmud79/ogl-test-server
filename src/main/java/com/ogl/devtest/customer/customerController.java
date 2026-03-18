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
    // Log the incoming request to see the data
    System.out.println("Updating customer with ID: " + id + ", New Data: " + updatedCustomer);

    // Find the existing customer by ID
    Optional<Customer> existingCustomerOpt = customerRepository.findById(id);

    // Check if the customer exists
    if (!existingCustomerOpt.isPresent()) {
      return ResponseEntity.notFound().build(); // Customer with this ID does not exist
    }

    Customer existingCustomer = existingCustomerOpt.get();

    // Update the fields with new data (name and address)
    existingCustomer.setName(updatedCustomer.getName());
    existingCustomer.setStreet(updatedCustomer.getStreet());
    existingCustomer.setCity(updatedCustomer.getCity());
    existingCustomer.setCountry(updatedCustomer.getCountry());
    existingCustomer.setPostcode(updatedCustomer.getPostcode());

    // Save the updated customer back to the database
    Customer savedCustomer = customerRepository.save(existingCustomer);

    // Return the updated customer as a response
    return ResponseEntity.ok(savedCustomer);
  }

  @DeleteMapping(value = "/{id}")
  public ResponseEntity<Void> deleteCustomer(@PathVariable("id") long id) {
    Optional<Customer> existingCustomer = customerRepository.findById(id);

    if (!existingCustomer.isPresent()) {
      return ResponseEntity.notFound().build();
    }

    customerRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
