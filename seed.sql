-- SYSTEM ROLES
INSERT INTO roles (id, name, description) VALUES
(1, 'SUPER_ADMIN', 'Full architectural and systemic administrative access'),
(2, 'STORE_MANAGER', 'Inventory operations, replenishment intake, asset allocation, and fulfillment metrics'),
(3, 'DEPARTMENT_HEAD', 'Submits requisition workflows and visualizes departmental logs'),
(4, 'VIEWER', 'Read-only systemic status check visual access');

-- DEPARTMENTS
INSERT INTO departments (name, code) VALUES
('Software Development', 'SOD'),
('Computer Systems and Architecture', 'CSA'),
('Accounting', 'ACC'),
('Building Construction', 'BDC'),
('Administration', 'ADMIN'),
('Library', 'LIB'),
('Laboratory', 'LAB');

-- STOCK CATEGORIES
INSERT INTO categories (name, description) VALUES
('Electronics', 'Compute assets, microcontrollers, and interface hardware'),
('Stationery', 'Classroom paper supplies and media accessories'),
('Construction Materials', 'Raw structural building components'),
('Lab Consumables', 'Chemical elements, storage vials, and instrumentation reagents');

-- SEED USERS (Password: 'Password123!')
INSERT INTO users (username, email, password_hash, role_id) VALUES
('admin', 'admin@appec.edu', '$2b$10$7Z2vX9Xb/24ZlyZk3K8VguHn0XfH/Ea99H8YtF6GqOnuM8vV847eq', 1),
('manager', 'manager@appec.edu', '$2b$10$7Z2vX9Xb/24ZlyZk3K8VguHn0XfH/Ea99H8YtF6GqOnuM8vV847eq', 2),
('hod_sod', 'hod.sod@appec.edu', '$2b$10$7Z2vX9Xb/24ZlyZk3K8VguHn0XfH/Ea99H8YtF6GqOnuM8vV847eq', 3);

-- SEED SUPPLIERS
INSERT INTO suppliers (id, name, contact_name, email, phone, address) VALUES
('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Kigali Tech Depot', 'Jean Paul', 'sales@techdepot.rw', '+250788123456', 'KN 4 Ave, Kigali'),
('b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', 'Dany Office Supplies', 'Marie Claire', 'info@dany.rw', '+250788654321', 'KG 11 St, Gasabo');

-- SEED STOCK ITEMS
INSERT INTO stock_items (id, item_code, name, description, category_id, quantity_available, minimum_stock_level, unit_of_measure) VALUES
('c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'ELE-LAP-01', 'HP ProBook 450', 'Core i5 16GB RAM developmental assets', 1, 45.00, 5.00, 'Units'),
('d4e5f67a-8b9c-0d1e-2f3a-4b5c6d7e8f9a', 'STA-PAP-A4', 'A4 Duplicating Paper', 'High grade 80gsm white printing reams', 2, 120.00, 20.00, 'Reams'),
('e5f67a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b', 'CON-CEM-42', 'CIMERWA Cement 42.5N', 'Portland engineering structural cement bags', 3, 4.00, 15.00, 'Bags');