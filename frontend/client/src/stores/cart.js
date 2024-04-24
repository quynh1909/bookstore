// stores/cart.js hoặc stores/cart.ts
import { defineStore } from "pinia";

export const useCartStore = defineStore({
  id: "cart",
  state: () => ({
    books: [],
    totalQuantity: 0,
    totalPrice: 0,
  }),
  //Getter: là nơi tính toán
  getters: {
    // Tính tổng số lượng và tổng giá tiền khi có sự thay đổi trong giỏ hàng
  },
  actions: {
    addBook(book) {
      const existingBook = this.books.find((b) => b._id === book._id);
      if (existingBook) {
        existingBook.quantity += 1;
      } else {
        this.books.push(book);
      }
      this.calculateTotals();
    },
    removeBook(bookId) {
      this.books = this.books.filter((b) => b._id !== bookId);
      this.calculateTotals();
    },
    updateQuantity(bookId, quantity) {
      const book = this.books.find((b) => b._id === bookId);
      if (book) {
        book.quantity = quantity;
      }
      this.calculateTotals();
    },
    incrementBookQuantity(bookId) {
      const book = this.books.find((b) => b._id === bookId);
      if (book) {
        book.quantity++;
        this.calculateTotals();
      }
    },

    decrementBookQuantity(bookId) {
      const book = this.books.find((b) => b._id === bookId);
      if (book && book.quantity > 1) {
        book.quantity--;
        this.calculateTotals();
      }
    },
    clearCart() {
      this.books = [];
      this.calculateTotals();
    },
    calculateTotals() {
      this.totalQuantity = 0;
      this.totalPrice = 0;
      for (const book of this.books) {
        this.totalQuantity += book.quantity;
        this.totalPrice += book.quantity * book.price;
      }
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: window.localStorage,
      },
    ],
  },
});
