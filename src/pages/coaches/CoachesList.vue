<template>
  <coach-filter @change-filter="setFilters"></coach-filter>
  <base-card>
    <section>
      <div class="controls">
        <base-button @click="loadCoaches()" mode="outline">Refresh</base-button>
        <base-button v-if="!isCoach && !isLoading" link to="/register"
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
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import BaseCard from '../../components/ui/BaseCard.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
  data() {
    return {
      isLoading: false,
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
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches() {
      this.isLoading = true;
      await this.$store.dispatch('coaches/loadCoaches');
      this.isLoading = false;
    },
  },
  computed: {
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
