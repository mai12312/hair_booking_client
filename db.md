# database

1. admins
- fullname varchar(255)
- avatar text
- phone
- password: varchar(255)
- email varchar(255) unique
- created_at
- updated_at

2. categories
- admin_id (người tạo dịch vụ)
- name (tên danh mục dịch vụ)
- order int (vị trí hiển thị)
- status: boolean (0: ẩn, 1: hiển thị)
- created_at
- updated_at

3. services
- admin_id, 
- category_id, 
- name, 
- status varchar(50) (approved, rejected, pending) default pending,
- image text, 
- duration int, 
- price int, 
- description text
- created_at
- updated_at

4. customers
- email unique
- phone unique
- name
- created_at
- updated_at

5.  bookings
- status: varchar(50) - canceled, approved, completed, doing, pending - default pending
- start_time
- end_time
- total_price
- total_duration
- create_by_admin_id - người tạo bookings - nếu null customer là người tạo 
- customer_email - email khách hàng
- created_at
- updated_at

6. booking_details
- service_id
- booking_id
- price
- duration
- created_at
- updated_at

7. booking_reasons
- booking_id
- reason text
- created_at
- updated_at