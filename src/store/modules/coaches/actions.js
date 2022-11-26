export default {
  addNewCoach(context, data) {
    const newCoach = {
      id: context.rootGetters.coachId,
      firstName: data.first,
      lastName: data.last,
      hourlyRate: data.rate,
      areas: data.areas,
      description: data.desc,
    };
    context.commit('addNewCoach', newCoach);
  },
};
