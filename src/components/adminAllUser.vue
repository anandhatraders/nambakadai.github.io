<template>
  <div class="container mt-5 pt-3">
    <div class="row mt-3">
      <div class="alert alert-warning" role="alert" v-if="message">
        {{ message }}
      </div>
      <div class="col">
        <div class="alert alert-info">
          <p>Hello Admin Here's your Users List Detail</p>
        </div>

        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">UserName</th>
              <th scope="col">Staff User</th>
              <th scope="col">Active User</th>
              <th scope="col">User Type</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
              <th scope="col">Reset</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in users_data" :key="data.id">
              <td class="col">{{ data.username }}</td>
              <td class="col">{{ data.is_staff }}</td>
              <td class="col">{{ data.is_active }}</td>
              <td class="col">{{ data.user_type }}</td>
              <td class="col">
                <button @click="updateUser(data.public_id)">update</button>
              </td>
              <td class="col">
                <button @click="deleteUser(data.public_id)">Delete</button>
              </td>
              <td class="col">
                <button @click="passwordReset(data.public_id)">Reset</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users_data: [
        {
          public_id: "0cfe85fb-4c97-4ea3-9535-88140ea9ffcf",
          is_superuser: true,
          email: "admin@nambakadai.com",
          phone_number: 9087991886,
          aadhar_number: 980978986787,
          pan_number: "AKH9087991",
        },
      ],
      message: "",
    };
  },
  beforeMount() {
    this.$http.get(this.$store.getters.url + "/users").then((data) => {
      this.users_data = data.body;
    });
  },
  methods: {
    updateUser(data) {
      this.$router.push("/admin/user/update?public_id=" + data);
    },
    passwordReset(data) {
      this.$http
        .post(this.$store.getters.url + "/user-reset-password/" + data)
        .then((data) => {
          this.message = data.body;
        })
        .catch((e) => {
          this.message = e.body;
        });
    },
    deleteUser(data) {
      this.$http
        .delete(this.$store.getters.url + "/user-delete/" + data)
        .then((data) => {
          this.message = data.body;
        })
        .catch((e) => {
          this.message =
            "This User has some contributions to either Stocks or Orders You cannot Delete this account";
          console.log(e);
        });
    },
  },
};
</script>

<style>
</style>
