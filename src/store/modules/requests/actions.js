export default {
  async contactCoach(context, data) {
    const newRequest = {
      userEmail: data.email,
      userMessage: data.message,
    };
    const response = await fetch(
      `https://find-a-coach-4a9f4-default-rtdb.europe-west1.firebasedatabase.app/requests/${data.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Could not send data!');
      throw error;
    }

    newRequest.id = responseData.name;
    newRequest.coachId = data.coachId;

    context.commit('addNewRequest', newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://find-a-coach-4a9f4-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=` +
        token
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch requests!'
      );
      throw error;
    }
    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        userMessage: responseData[key].userMessage,
      };
      requests.push(request);
    }
    context.commit('setRequests', requests);
  },
};
