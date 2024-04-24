<template>
  <div id="layoutSidenav_content">
    <main>
      <div class="container-fluid px-4">
        <h2 style="font-weight: 600" class="mt-4">Thêm sách</h2>

        <div class="card mb-4"></div>
        <div class="container-fluid">
          <form @submit="submitAddBook" enctype="multipart/form-data">
            <div class="row mb-4">
              <div class="col">
                <div class="form-outline">
                  <label class="form-label" for="bookName"
                    >Tên sách</label
                  >
                  <input
                    type="text"
                    id="bookName"
                    v-model="bookData.bookName"
                    class="form-control"
                    name="bookName"
                  />
                  <div class="text-danger">
                    {{ bookNameError }}
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="form-outline">
                  <label class="form-label" for="bookDescription"
                    >Mô tả sách</label
                  >
                  <input
                    type="text"
                    id="bookDescription"
                    v-model="bookData.bookDes"
                    class="form-control"
                    name="bookDes"
                  />
                  <div class="text-danger">
                    {{ bookDesError }}
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <div class="form-outline">
                  <label class="form-label" for="bookCategory"
                    >Thể loại sách</label
                  >
                  <select
                    id="bookCategory"
                    v-model="bookData.categoryId"
                    class="form-select"
                    name="categoryId"
                  >
                    <option disabled value="">
                      Vui lòng chọn một thể loại
                    </option>
                    <option
                      v-for="category in categories"
                      :key="category._id"
                      :value="category._id"
                    >
                      {{ category.categoryName }}
                    </option>
                  </select>

                  <div class="text-danger">
                    {{ categoryIdError }}
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="form-outline">
                  <label class="form-label" for="bookImage"
                    >Hình ảnh sách</label
                  >
                  <input
                    type="file"
                    name="bookImg"
                    @change="handleImageUpload"
                    class="form-control"
                    multiple
                  />
                  <div class="text-danger">
                    {{ bookImgError }}
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <div class="form-outline">
                  <label class="form-label" for="bookPrice">Đơn giá</label>
                  <input
                    type="text"
                    id="bookPrice"
                    v-model="bookData.price"
                    class="form-control"
                    name="price"
                  />
                  <div class="text-danger">
                    {{ priceError }}
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="form-outline">
                  <label class="form-label" for="bookQuantity">Số lượng</label>
                  <input
                    type="text"
                    id="bookQuantity"
                    v-model="bookData.quantity"
                    class="form-control"
                    name="quantity"
                  />
                  <div class="text-danger">{{ quantityError }}</div>
                </div>
              </div>
              
            </div>
            <div class="row mb-4">
              <div class="col">
                <div class="form-outline">
                  <label class="form-label" for="bookOrigin">Đơn vị phát hành</label>
                  <input
                    type="text"
                    id="bookOrigin"
                    v-model="bookData.origin"
                    class="form-control"
                    name="origin"
                  />
                  <div class="text-danger">
                    {{ originError }}
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="form-outline">
                  <label class="form-label" for="bookBrand"
                    >Nhà xuất bản</label
                  >
                  <input
                    type="text"
                    id="bookBrand"
                    v-model="bookData.trademark"
                    class="form-control"
                    name="trademark"
                  />
                  <div class="text-danger">
                    {{ trademarkError }}
                  </div>
                </div>
              </div>
            </div>
            <!-- Submit button -->
            <button type="submit" class="btn btn-dark btn-block mb-4">
              Thêm
            </button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth.js";
import bookService from "@/services/book.service.js";
import { ref, reactive } from "vue";
import * as yup from "yup";

const authStore = useAuthStore();
const schema = yup.object().shape({
  bookName: yup.string().required("Tên sách không được để trống"),
  bookDes: yup.string().required("Mô tả sách không được để trống"),
  categoryId: yup.string().required("Thể loại sách không được để trống"),
  bookImg: yup
    .array()
    .min(2, "Phải tải lên ít nhất 2 hình ảnh")
    .max(2, "Chỉ được tải lên tối đa 2 hình ảnh")
    .typeError("Hình ảnh sách không được để trống"),
  price: yup.number().typeError("Đơn giá không được để trống").nullable(),
  quantity: yup.number().typeError("Số lượng không được để trống").nullable(),
  trademark: yup.string().required("Nhãn hiệu không được để trống"),
  origin: yup.string().required("Xuất xứ không được để trống"),
});
export default {
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, context) {
    const bookData = reactive({
      bookName: "",
      bookDes: "",
      categoryId: "",
      bookImg: "",
      price: "",
      quantity:"",
      trademark: "",
      origin: "",
    });

    const bookNameError = ref("");
    const bookDesError = ref("");
    const bookImgError = ref("");
    const categoryIdError = ref("");
    const priceError = ref("");
    const quantityError = ref("");
    const trademarkError = ref("");
    const originError = ref("");
    const handleImageUpload = (event) => {
      const imageFiles = event.target.files; // Lấy danh sách tệp hình ảnh đã chọn

      if (imageFiles && imageFiles.length > 0) {
        bookData.bookImg = Array.from(imageFiles); // Chuyển đổi FileList thành mảng
      } else {
        bookData.bookImg = [];
      }
    };

    const submitAddBook = (event) => {
      event.preventDefault();
      bookNameError.value = null;
      bookDesError.value = null;
      categoryIdError.value = null;
      bookImgError.value = null;
      priceError.value = null;
      quantityError.value = null;
      trademarkError.value = null;
      originError.value = null;
      schema
        .validate(bookData, { abortEarly: false })
        .then(() => {
          bookNameError.value = null;
          bookDesError.value = null;
          bookImgError.value = null;
          categoryIdError.value = null;
          priceError.value = null;
          quantityError.value = null;
          trademarkError.value = null;
          originError.value = null;

          context.emit("submit:addbook", bookData);
        })
        .catch((errors) => {
          // Handle validation errors
          errors.inner.forEach((error) => {
            if (error.path === "bookName") {
              bookNameError.value = error.message;
            }
            if (error.path === "bookDes") {
              bookDesError.value = error.message;
            }
            if (error.path === "bookImg") {
              bookImgError.value = error.message;
            }
            if (error.path === "categoryId") {
              categoryIdError.value = error.message;
            }
            if (error.path === "price") {
              priceError.value = error.message;
            }
            if (error.path === "quantity") {
              quantityError.value = error.message;
            }
            if (error.path === "trademark") {
              trademarkError.value = error.message;
            }
            if (error.path === "origin") {
              originError.value = error.message;
            }
          });
        });
    };

    return {
      bookData,
      bookNameError,
      bookDesError,
      bookImgError,
      categoryIdError,
      priceError,
      quantityError,
      trademarkError,
      originError,

      submitAddBook,
      handleImageUpload,
    };
  },
};
</script>
