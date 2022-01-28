<template>
  <div class="container">
    <div class="card mt-5">
      <div class="card-body">
        <p>Hello User, You can <b>Update</b> Stock below.</p>
      </div>
    </div>
    <div class="alert alert-warning" role="alert" v-if="message">
      {{ message }}
    </div>

    <div class="row mt-3">
      <div class="col">
        <form method="post" @submit.prevent="updateStock">
          <validation-provider rules="required" v-slot="{ errors }">
            <div class="card mb-3">
              <div class="card-body">
                <h5 class="text-center mb-3">Update Stock</h5>
                <div class="input">
                  <label>Product Name</label>
                  <input
                    type="text"
                    class="form-control mb-3"
                    v-model="update_stock.productName"
                    placeholder="Product Name"
                    :class="{ required_field_false: error.productName }"
                    required
                  />
                  <label>Product Grade</label>
                  <input
                    type="text"
                    class="form-control mb-3"
                    v-model="update_stock.product_grade"
                    placeholder="Product Grade"
                    :class="{ required_field_false: error.product_grade }"
                    required
                  />
                  <label>Note</label>
                  <input
                    type="text"
                    class="form-control mb-3"
                    v-model="update_stock.note"
                    placeholder="Product Note"
                    :class="{ required_field_false: error.note }"
                    required
                  />
                  <div class="input-group-postpend">
                    <button type="submit" class="btn btn-success w-100">
                      Update Stock
                    </button>
                  </div>
                </div>
                <span class="required_field_false">{{ errors[0] }}</span>
              </div>
            </div>
          </validation-provider>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      update_stock: {
        productName: "",
        product_grade: "",
        note: "",
        quantitiesLeft: 0,
        productInstock: false,
      },
      error: {
        productName: false,
        product_grade: false,
        note: false,
      },
      message: "",
    };
  },
  methods: {
    updateStock() {
      this.$http
        .post(
          this.$store.getters.url +
            "/stock-update/" +
            this.$route.query.public_id,
          this.update_stock
        )
        .then((data) => {
          console.log(data);
          this.message = "Stock Added Successfully";
        });
    },
  },
  beforeMount() {
    this.$http
      .get(
        this.$store.getters.url + "/stock-update/" + this.$route.query.public_id
      )
      .then((data) => {
        this.update_stock = data.body;
      });
  },
};
</script>

<style>
.required_field_false {
  border-color: rgb(245, 61, 61);
}
</style>
