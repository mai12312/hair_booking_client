export declare global {
    type AuthAdmin = {
        email: string;
        accessToken: string;
        isAuth: boolean;
        admin: Partial<Admin>;
    }

    type DataResponse<T> = {
      status: number;
      message: string;
      datas: T;
    }

    /**
     * @desc type of "admins" table in database
     */
    type Admin = {
      id: number;
      fullName: string;
      avatar?: string;
      phone?: string;
      password: string;
      email: string;
      createdAt?: string;
      updatedAt?: string;
    }
    type AdminList = Array<Admin>;

    /**
     * @desc type of "categories" table in database
     */
    type Category = {
        id: number;
        adminId?: number;
        name: string;
        displayOrder?: number;
        status?: number;
        createdAt?: string;
        updatedAt?: string;
    }
    type CategoryList = Array<Category>;

    /**
     * @desc type of "services" table in database
     */
    type Service = {
        id: number;
        adminId: number;
        categoryId: number;
        name: string;
        status?: string;
        image?: string;
        duration?: number;
        price?: number;
        description?: string;
        createdAt?: string;
        updatedAt?: string;
    }
    type ServiceList = Array<Service>;

    type ServicesByCategories = {
        services: Service[];
        id: number;
        adminId?: number;
        name: string;
        displayOrder?: number;
        status?: number;
        createdAt?: string;
        updatedAt?: string;
    };

    /**
     * @desc type of "customers" table in database
     */
    type Customer = {
        id: number;
        email: string;
        phone: string;
        name?: string;
        createdAt?: string;
        updatedAt?: string;
    }
    type CustomerList = Array<Customer>;

    /**
     * @desc type of "bookings" table in database
     */
    type Booking = {
        id?: number;
        status?: string;
        startTime: string;
        endTime?: string;
        date?: string;
        totalPrice?: number;
        totalDuration?: number;
        customerEmail: string;
        customerPhone: string;
        customerName: string;
        serviceIds?: Array<number>;
        createdByAdminId?: number;
        code?: string;
        createdAt?: string;
        updatedAt?: string;
        time?: string;
    }
    type BookingList = Array<Booking>;

    /**
     * @desc type of "booking_details" table in database
     */
    type BookingDetail = {
        id: number;
        serviceId: number;
        bookingId: number;
        price?: number;
        duration?: number;
        createdAt?: string;
        updatedAt?: string;
    }
    type BookingDetailList = Array<BookingDetail>;

    /**
     * @desc type of "booking_reasons" table in database
     */
    type BookingReason = {
        id: number;
        bookingId: number;
        reason?: string;
        createdAt: string;
        updatedAt: string;
    }
    type BookingReasonList = Array<BookingReason>;
}
