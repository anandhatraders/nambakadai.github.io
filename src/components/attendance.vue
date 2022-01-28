<template>
  <div>
    <div v-for="(user, index) in users" :key="user.public_id">
      {{ (add_attendance_data[index].user = user.public_id) }}
      {{ (add_attendance_data[index].status = false) }}
    </div>
    {{ add_attendance_data }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      add_attendance_data: [],
      attendance_data: {
        status: false,
        user: "",
      },
      users: [],
    };
  },
  beforeMount() {
    this.$http
      .get(this.$store.getters.url + "/attendance-create/")
      .then((data) => {
        this.attendance_data = data.body;
      });
    this.$http.get(this.$store.getters.url + "/users/").then((data) => {
      this.users = data.body;
    });
    var index = 1;
    for (var user in this.users) {
      add_attendance_data[index].user = user.public_id;
      add_attendance_data[index].status = false;
      index += 1;
    }
  },
};
</script>

<style scoped>
</style>
