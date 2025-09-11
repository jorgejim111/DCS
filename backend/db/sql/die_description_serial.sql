CREATE TABLE IF NOT EXISTS die_description (
    id INT AUTO_INCREMENT PRIMARY KEY,
    inch_id INT NOT NULL,
    part_id INT NOT NULL,
    description_id INT NOT NULL,
    die_description VARCHAR(255) NOT NULL,
    min_in_circulation INT DEFAULT 0,
    min_in_stock INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (inch_id) REFERENCES inch_catalog(id),
    FOREIGN KEY (part_id) REFERENCES part_catalog(id),
    FOREIGN KEY (description_id) REFERENCES description_catalog(id)
);

CREATE TABLE IF NOT EXISTS die_serial (
    id INT AUTO_INCREMENT PRIMARY KEY,
    serial_number VARCHAR(100) NOT NULL UNIQUE,
    die_description_id INT NOT NULL,
    status_id INT NOT NULL,
    `inner` DECIMAL(10,2),
    `outer` DECIMAL(10,2),
    `proudness` DECIMAL(10,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (die_description_id) REFERENCES die_description(id),
    FOREIGN KEY (status_id) REFERENCES status_catalog(id)
);
