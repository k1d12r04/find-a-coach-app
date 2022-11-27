export default {
  contactCoach(context, data) {
    const newRequest = {
      id: new Date().toISOString(),
      coachId: data.coachId,
      userEmail: data.email,
      userMessage: data.message,
    };
    context.commit('addNewRequest', newRequest);
  },
};
