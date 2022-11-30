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

  async loadCoaches(context) {
    const response = await fetch(
      'https://find-a-coach-4a9f4-default-rtdb.europe-west1.firebasedatabase.app/.json'
    );
    if (!response.ok) {
      // error message
    }
    const responseData = await response.json();

    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
        description: responseData[key].description,
      };
      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
  },
};
