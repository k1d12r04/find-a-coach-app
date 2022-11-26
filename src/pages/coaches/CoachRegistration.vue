<template>
  <base-card>
    <h2>Register as a coach now!</h2>
    <coach-form @new-coach-data="newCoach"></coach-form>
  </base-card>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm,
  },
  methods: {
    newCoach(coachData) {
      this.$store.dispatch('coaches/addNewCoach', coachData);
      this.$router.replace('/coaches');
    },
  },
};
</script>
