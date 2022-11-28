export default {
  async addNewCoach(context, data) {
    const userId = context.rootGetters.userId;
    const newCoach = {
      firstName: data.first,
      lastName: data.last,
      hourlyRate: data.rate,
      areas: data.areas,
      description: data.desc,
    };

    const response = await fetch(
      `https://find-a-coach-4a9f4-default-rtdb.europe-west1.firebasedatabase.app/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(newCoach),
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // error message
    }

    context.commit('addNewCoach', {
      ...newCoach,
      id: userId,
    });
  },
};
