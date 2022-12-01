<template>
  <section>
    <base-card>
      <h2>Page not found</h2>
      <p>This page could not be found — maybe check out all our coaches.</p>
      <base-button link :to="allCoachesLink">All coaches</base-button>
    </base-card>
  </section>
</template>

<script>
export default {
  computed: {
    allCoachesLink() {
      return '/coaches';
    },
  },
};
</script>
