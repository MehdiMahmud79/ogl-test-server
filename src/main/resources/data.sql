INSERT INTO product (id, sku, price, description)
VALUES (DEFAULT, 'AAA001', 5.99, 'Product AAA001 description'),
       (DEFAULT, 'AAA002', 10.00, 'Product AAA002 description'),
       (DEFAULT, 'BBB001', 0.69, 'Product BBB001 description');



INSERT INTO customer (name, street, city, country, postcode)
VALUES 
    ('Rick Sanchez', '123 Portal Ave', 'Crouch End', 'London', 'N8 8AA'),
    ('Walter White', '308 Negra Arroyo Lane', 'Albuquerque', 'Bernalillo', '87104'),
    ('William Butcher', '42 Carnage St', 'Hackney', 'London', 'E8 1AA');