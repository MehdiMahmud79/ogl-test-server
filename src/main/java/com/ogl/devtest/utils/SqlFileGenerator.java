package com.ogl.devtest.utils;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Random;

public class SqlFileGenerator {

    public static void main(String[] args) {
        Random random = new Random();

        String[] cities = { "London", "Manchester", "Birmingham", "Leeds", "Glasgow", "Liverpool", "Edinburgh",
                "Bristol", "Cardiff", "Newcastle" };
        String[] streets = { "High Street", "Station Road", "Main Street", "Church Lane", "London Road",
                "Victoria Street", "Green Lane", "Park Road", "Queens Road", "King Street" };
        String[] firstNames = { "James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas",
                "Charles" };
        String[] lastNames = { "Smith", "Jones", "Taylor", "Brown", "Williams", "Wilson", "Evans", "Thomas", "Roberts",
                "Johnson" };

        try (PrintWriter writer = new PrintWriter(new FileWriter("insert_data.sql"))) {

            // Products
            writer.println("INSERT INTO product (id, sku, price, description) VALUES");
            for (int i = 1; i <= 1000; i++) {
                String sku = "SKU" + String.format("%04d", i);
                double price = Math.round((random.nextDouble() * 100 + 0.5) * 100.0) / 100.0;
                String description = "Product " + sku + " description";
                writer.print("(DEFAULT, '" + sku + "', " + price + ", '" + description + "')");
                writer.println(i < 1000 ? "," : ";");
            }

            writer.println();

            // Customers
            writer.println("INSERT INTO customer (name, street, city, country, postcode) VALUES");
            for (int i = 1; i <= 1000; i++) {
                String name = firstNames[random.nextInt(firstNames.length)] + " "
                        + lastNames[random.nextInt(lastNames.length)];
                String streetNumber = String.valueOf(random.nextInt(200) + 1);
                String street = streetNumber + " " + streets[random.nextInt(streets.length)];
                String city = cities[random.nextInt(cities.length)];
                String country = "UK";
                String postcode = generateUKPostcode(random);

                writer.print(
                        "('" + name + "', '" + street + "', '" + city + "', '" + country + "', '" + postcode + "')");
                writer.println(i < 1000 ? "," : ";");
            }

            System.out.println("insert_data.sql generated successfully!");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static String generateUKPostcode(Random random) {
        String letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String digits = "0123456789";

        // Format: A1 1AA
        char l1 = letters.charAt(random.nextInt(letters.length()));
        char d1 = digits.charAt(random.nextInt(digits.length()));
        char d2 = digits.charAt(random.nextInt(digits.length()));
        char l2 = letters.charAt(random.nextInt(letters.length()));
        char l3 = letters.charAt(random.nextInt(letters.length()));

        return "" + l1 + d1 + " " + d2 + l2 + l3;
    }
}