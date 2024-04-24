<template>
  <div id="layoutSidenav_content">
    <main>
      <div class="container-fluid px-4">
        <h2 style="font-weight: 600" class="mt-4">Cập nhật sách</h2>

        <div class="card mb-4"></div>
        <div class="container-fluid">
          <form
            @submit.prevent="submitUpdateBook"
            enctype="multipart/form-data"
          >
            <div class="row mb-4">
              <div class="col">
                <div class="form-outline">
                  <label class="form-label" for="bookName">Tên sách</label>
                  <input
                    type="text"
                    id="bookName"
                    v-model="currentBook.bookName"
                    class="form-control"
                    name="bookName"
                  />
                  <div class="text-danger">{{ bookNameError }}</div>
                </div>
              </div>
              <div class="col">
                <div class="form-outline">
                  <label class="form-label" for="bookBrand">Nhà xuất bản</label>
                  <input
                    type="text"
                    id="bookBrand"
                    v-model="currentBook.trademark"
                    class="form-control"
                    name="trademark"
                  />
                  <div class="text-danger">{{ trademarkError }}</div>
                </div>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <div class="form-outline">
                  <label class="form-label" for="bookDescription">Mô tả sách</label>
                  <input
                    type="text"
                    id="bookDescription"
                    v-model="currentBook.bookDes"
                    class="form-control"
                    name="bookDes"
                  />
                  <div class="text-danger">{{ bookDesError }}</div>
                </div>
              </div>
              <div class="col">
                <div class="form-outline">
                  <label class="form-label" for="bookCategory">Thể loại sách</label>
                  <select
                    :key="currentBook.categoryId"
                    id="bookCategory"
                    v-model="currentBook.categoryId"
                    class="form-select"
                    name="categoryId"
                  >
                    <option disabled value="">Vui lòng chọn một thể loại</option>
                    <option
                      v-for="category in categories"
                      :key="category._id"
                      :value="category._id"
                      :selected="category._id === currentBook.categoryId"
                    >
                      {{ category.categoryName }}
                    </option>
                  </select>
                  <div class="text-danger">{{ categoryIdError }}</div>
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
                    v-model="currentBook.price"
                    class="form-control"
                    name="price"
                  />
                  <div class="text-danger">{{ priceError }}</div>
                </div>
              </div>
              <div class="col">
                <div class="form-outline">
                  <label class="form-label" for="bookQuantity">Số lượng</label>
                  <input
                    type="text"
                    id="bookQuantity"
                    v-model="currentBook.quantity"
                    class="form-control"
                    name="quantity"
                  />
                  <div class="text-danger">{{ quantityError }}</div>
                </div>
              </div>
              
            </div>
            <!-- Hình ảnh sách -->
            <div class="row mb-4">
              <div class="col">
                <div class="form-outline">
                  <label class="form-label" for="bookImage">Hình ảnh sách</label>
                  <input
                    type="file"
                    name="bookImg"
                    @change="handleImageUpdate"
                    class="form-control"
                    multiple
                  />
                  <div class="text-danger"></div>
                </div>
              </div>
              <div class="col">
                <div class="form-outline">
                  <label class="form-label" for="bookOrigin">Đơn vị phát hành</label>
                  <input
                    type="text"
                    id="bookOrigin"
                    v-model="currentBook.origin"
                    class="form-control"
                    name="origin"
                  />
                  <div class="text-danger">{{ originError }}</div>
                </div>
              </div>
            </div>
            <!-- Submit button -->
            <button type="submit" class="btn btn-dark btn-block mb-4">Cập nhật</button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>


<script>
import { ref, toRefs } from "vue";
import * as yup from "yup";

// Định nghĩa schema validation
const schema = yup.object().shape({
  bookName: yup.string().required("Tên sách không được để trống"),
  bookDes: yup.string().required("Mô tả sách không được để trống"),
  categoryId: yup.string().required("Thể loại sách không được để trống"),
  price: yup.number().typeError("Giá sách không được để trống").nullable(),
  quantity: yup.number().typeError("Số lượng không được để trống").nullable(),
  trademark: yup.string().required("Nhãn hiệu không được để trống"),
  origin: yup.string().required("Xuất xứ không được để trống"),
});

export default {
  props: {
    currentBook: Object,
    categories: {
      type: Array,
      default: () => [],
    },
  },

  setup(props, { emit }) {
    const { currentBook } = toRefs(props);
    const bookNameError = ref("");
    const bookDesError = ref("");
    const categoryIdError = ref("");
    const priceError = ref("");
    const quantityError = ref("");
    const trademarkError = ref("");
    const originError = ref("");

    const handleImageUpdate = (event) => {
      const imageFiles = event.target.files;
      if (imageFiles && imageFiles.length > 0) {
        currentBook.value.bookImg = Array.from(imageFiles);
      }
    };

    const submitUpdateBook = (event) => {
      event.preventDefault();
      bookNameError.value = null;
      bookDesError.value = null;
      categoryIdError.value = null;
      priceError.value = null;
      quantityError.value = null;
      trademarkError.value = null;
      originError.value = null;

      schema
        .validate(currentBook.value, { abortEarly: false })
        .then(() => {
          emit("updateBook", currentBook.value);
        })
        .catch((errors) => {
          errors.inner.forEach((error) => {
            if (error.path === "bookName") bookNameError.value = error.message;
            if (error.path === "bookDes") bookDesError.value = error.message;
            if (error.path === "categoryId") categoryIdError.value = error.message;
            if (error.path === "price") priceError.value = error.message;
            if (error.path === "quantity") quantityError.value = error.message;
            if (error.path === "trademark") trademarkError.value = error.message;
            if (error.path === "origin") originError.value = error.message;
          });
        });
    };

    return {
      currentBook,
      bookNameError,
      bookDesError,
      categoryIdError,
      priceError,
      quantityError,
      trademarkError,
      originError,
      handleImageUpdate,
      submitUpdateBook,
    };
  },
};
</script>
