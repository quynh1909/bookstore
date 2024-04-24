<template>
  <div id="layoutSidenav_content">
    <main>
      <div class="container-fluid px-4">
        <h1 class="mt-4" style="font-weight: 600">Danh sách khách hàng</h1>
        <ol class="breadcrumb mb-4">
          Tổng:
          {{
            customerCount
          }}
          khách hàng
        </ol>
        <div class="card mb-4"></div>
        <div class="mb-4">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-body"></div>
                  <div class="table-responsive">
                    <table class="table no-wrap user-table mb-0">
                      <thead style="background-color: #fff !important">
                        <tr>
                          <th
                            scope="col"
                            class="border-0 text-uppercase font-medium pl-4"
                          >
                            STT
                          </th>
                          <th
                            scope="col"
                            class="border-0 text-uppercase font-medium"
                          >
                            Họ và tên
                          </th>
                          <th
                            scope="col"
                            class="border-0 text-uppercase font-medium"
                          >
                            Số điện thoại
                          </th>
                          <th
                            scope="col"
                            class="border-0 text-uppercase font-medium"
                          >
                            Địa chỉ
                          </th>
                          <th
                            scope="col"
                            class="border-0 text-uppercase font-medium"
                          >
                            Email
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(customer, index) in customers"
                          :key="customer._id"
                        >
                          <td class="pl-4">&ensp;{{ index + 1 }}</td>
                          <td>
                            <h5 class="font-medium mb-0">
                              {{ customer.name }}
                            </h5>
                          </td>
                          <td>
                            <span class="text-muted">{{ customer.phone }}</span>
                          </td>
                          <td>
                            <span class="text-muted">{{
                              customer.address
                            }}</span>
                          </td>
                          <td>
                            <span class="text-muted">{{ customer.email }}</span
                            ><br />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import customerService from "@/services/customer.service.js";

import { ref, onMounted, computed } from "vue";

export default {
  setup() {
    const customers = ref([]);
    const customerCount = computed(() => {
      return customers.value.length;
    });
    const fetchCustomers = async () => {
      try {
        const response = await customerService.findAll();
        customers.value = response;
      } catch (error) {
        console.log("Lỗi khi lấy danh sách người dùng", error);
      }
    };

    onMounted(() => {
      fetchCustomers();
    });

    return {
      customers,
      customerCount,
    };
  },
};
</script>
