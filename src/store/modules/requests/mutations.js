export default {
  addNewRequest(state, payload) {
    state.requests.push(payload);
  },
  setRequests(state, payload) {
    state.requests = payload;
  },
};
