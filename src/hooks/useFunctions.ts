"use client"


type ErrorPhone = {
  error: string | null;
  phoneNumber?: string;
}
export function useFunctions() {
    /**
     * @desc Formats a phone number into a specific pattern.
     * @param phoneNumber - The phone number to format.
     * @returns The formatted phone number.
     */
    function formatPhoneNumber(phoneNumber: string):ErrorPhone  {
      // Remove any non-digit characters
      const digits = phoneNumber.replace(/\D/g, '');

      if (digits.length === 10) {
        // Format: 0123.456.789
        return {
          error: null,
          phoneNumber: `${digits.slice(0, 4)}.${digits.slice(4, 7)}.${digits.slice(7)}`
        };
      } else if (digits.length === 11) {
        // Format: 01234.567.890
        return {
          error: null,
          phoneNumber: `${digits.slice(0, 5)}.${digits.slice(5, 8)}.${digits.slice(8)}`
        };
      } else if(digits.length < 13) {
        return {
          error: null,
          phoneNumber
        };
      } else {
        return {
          error: "Số điện thoại không hợp lệ",
          phoneNumber
        };
      }
    }
    /**
     * Checks if a phone number is valid.
     * @param phoneNumber - The phone number to check.
     * @returns An object containing an error message (if any) and the formatted phone number.
     */
    function checkPhoneNumber(phoneNumber: string): ErrorPhone  {
      const digits = phoneNumber.replace(/\D/g, '');

      if (digits.length === 10) {
        // Format: 0123.456.789
        return {
          error: null
        };
      } else if (digits.length === 11) {
        // Format: 01234.567.890
        return {
          error: null
        };
      } else {
        return {
          error: "Số điện thoại không hợp lệ"
        };
      }
    }
    /**
     * Formats a price into a specific currency format.
     * @param price - The price to format.
     * @returns The formatted price string.
     */
    function formatPrice(price: number): string {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(price);
    }

    return {
      formatPhoneNumber,
      checkPhoneNumber,
      formatPrice
    }
}