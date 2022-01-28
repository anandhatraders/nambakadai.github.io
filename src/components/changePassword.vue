<template>
  <div class="container">
    <div class="main-bg mt-5">
      <div class="row justify-content-center">
        <div class="col-lg-4 col-md-6 col-sm-6">
          <div class="card shadow">
            <div class="card-title text-center border-bottom">
              <h2 class="p-3">Change Password</h2>
            </div>
            <div class="alert alert-warning" role="alert" v-if="message">
              {{ message }}
            </div>
            <form method="POST" @submit.prevent="updatePassword">
              <div class="card-body">
                <div class="mb-4">
                  <validation-provider rules="required" v-slot="{ errors }">
                    <label for="username" class="form-label"
                      >Old Password</label
                    >
                    <input
                      type="password"
                      v-model="user_data.old_password"
                      class="form-control"
                      id="username"
                      required
                    />
                    <span class="required_field_false">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div class="mb-4">
                  <validation-provider rules="required" v-slot="{ errors }">
                    <label for="email" class="form-label">New Password</label>
                    <input
                      type="password"
                      v-model="user_data.password"
                      class="form-control"
                      id="email"
                      required
                    />
                    <span class="required_field_false">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div class="mb-4">
                  <validation-provider rules="required" v-slot="{ errors }">
                    <label for="password" class="form-label"
                      >Conform Password</label
                    >
                    <input
                      type="password"
                      v-model="user_data.password2"
                      class="form-control"
                      id="password"
                      required
                    />
                    <span class="required_field_false">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div class="d-grid">
                  <button class="btn text-dark main-bg">SUBMIT</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_data: {
        old_password: "",
        password: "",
        password2: "",
      },
      message: "",
    };
  },
  methods: {
    updatePassword() {
      this.$http
        .post(
          this.$store.getters.url +
            "/user-update-password/" +
            this.$route.query.public_id,
          this.user_data
        )
        .then((data) => {
          console.log(data.body);
          this.message = "User password changed Successfully";
          setTimeout(this.signout, 5000);
        })
        .catch((e) => {
          console.log(e.body);
          this.message = e.body;
        });
    },
    signout() {
      this.$router.push("/signout");
    },
  },
};
</script>

<style scoped>
.main-bg {
  background-color: #dadada;
  margin: 2% 0% 0% 0%;
}

input:focus,
button:focus {
  border: 1px solid #dadada;
  box-shadow: none;
}

.form-check-input:checked {
  background-color: #dadada;
  border-color: #dadada;
}

.card,
.btn,
input {
  border-radius: 0 !important;
}
.required_field_false {
  color: red;
}
</style>
