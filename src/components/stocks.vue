<template>
  <div class="container mt-5 pt-3">
    <div id="cards_landscape_wrap-2">
      <h1 class="mt-1">NAMBA KADAI HOME</h1>
      <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-3 col-lg-4">
          <div class="card-flyer">
            <div class="text-box">
              <div class="text-container">
                <router-link to="/stock-create" class="anchor"
                  ><h6>Add Stocks</h6>
                </router-link>
                <div>
                  <div style="mt-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-xs-12 col-sm-6 col-md-3 col-lg-4"
          v-for="data in stock_data"
          :key="data.public_id"
        >
          <a @click="stockUpdate(data.public_id)" class="anchor">
            <div class="card-flyer">
              <div class="text-box">
                <!-- <div class="image-box">
                    <img src="../assets/stock.jpg" alt="" />
                  </div> -->
                <div class="text-container">
                  <h6>{{ data.productName }}</h6>
                  <div>
                    <span
                      v-if="data.quantitiesLeft < 10"
                      class="btn btn-danger disabled m-2"
                      >Place Order, Running Out Soon
                    </span>
                    <div style="mt-1">
                      <span class="row mt-1">
                        <span class="col">Product Grade</span>
                        <span class="col">{{ data.product_grade }}</span>
                      </span>
                      <span class="row mt-1">
                        <span class="col">Quantities Left</span>
                        <span class="col">{{ data.quantitiesLeft }} KG</span>
                      </span>
                      <span class="row mt-1">
                        <span class="col">Product Note</span>
                        <span class="col">{{ data.note }}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stock_data: [],
    };
  },
  methods: {
    stockUpdate(data) {
      this.$router.push("/stock-update?public_id=" + data);
    },
  },
  beforeMount() {
    this.$http.get(this.$store.getters.url + "/stocks").then((data) => {
      this.stock_data = data.body;
      console.log(this.stock_data);
    });
  },
};
</script>

<style scoped>
/*----  Main Style  ----*/
#cards_landscape_wrap-2 {
  text-align: center;
}
#cards_landscape_wrap-2 .container {
  padding-top: 80px;
  padding-bottom: 100px;
}
#cards_landscape_wrap-2 a {
  text-decoration: none;
  outline: none;
}
#cards_landscape_wrap-2 .card-flyer {
  border-radius: 5px;
}
#cards_landscape_wrap-2 .card-flyer .image-box {
  background: rgb(48, 48, 48);
  overflow: hidden;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
}
#cards_landscape_wrap-2 .card-flyer .image-box img {
  width: 100%;
  height: 200px;
}
#cards_landscape_wrap-2 .card-flyer:hover .image-box img {
  opacity: 0.7;
  transform: scale(1.15);
}
#cards_landscape_wrap-2 .card-flyer .text-box {
  text-align: center;
}
#cards_landscape_wrap-2 .card-flyer .text-box .text-container {
  padding: 30px 18px;
}
#cards_landscape_wrap-2 .card-flyer {
  background: #2e2e2e;
  margin-top: 50px;
  transition: all 0.2s ease-in;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.4);
}
#cards_landscape_wrap-2 .card-flyer:hover {
  background: #fff;
  box-shadow: 0px 15px 26px rgba(0, 0, 0, 0.5);
  transition: all 0.2s ease-in;
  margin-top: 50px;
}
#cards_landscape_wrap-2 .card-flyer .text-box p {
  margin-top: 10px;
  margin-bottom: 0px;
  padding-bottom: 0px;
  font-size: 14px;
  letter-spacing: 1px;
  color: #2e2e2e;
}
#cards_landscape_wrap-2 .card-flyer .text-box h6 {
  margin-top: 0px;
  margin-bottom: 4px;
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: "Roboto Black", sans-serif;
  letter-spacing: 1px;
  color: #00cafd;
}
</style>
