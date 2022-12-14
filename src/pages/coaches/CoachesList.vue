<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <coach-filter @change-filter="setFilters"></coach-filter>
    <base-card>
      <section>
        <div class="controls">
          <base-button @click="loadCoaches(true)" mode="outline"
            >Refresh</base-button
          >
          <base-button v-if="!isLoggedIn" link to="/auth?redirect=register"
            >Login to register as a coach</base-button
          >
          <base-button v-if="showRegisterButton" link to="/register"
            >Register as Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :areas="coach.areas"
            :rate="coach.hourlyRate"
          ></coach-item>
        </ul>
        <h3 v-else>No coaches found.</h3>
      </section>
    </base-card>
  </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import BaseCard from '../../components/ui/BaseCard.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  components: {
    CoachItem,
    BaseCard,
    CoachFilter,
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    handleError() {
      this.error = false;
    },
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;

      try {
        await this.$store.dispatch('coaches/loadCoaches', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = 'Something went wrong!';
      }

      this.isLoading = false;
    },
  },
  computed: {
    showRegisterButton() {
      return !this.isCoach && !this.isLoading && this.isLoggedIn;
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter((coach) => {
        for (const area in this.activeFilters) {
          if (this.activeFilters[area] && coach.areas.includes(area))
            return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
