import { createApp } from 'vue';

// component imports
import router from './router.js';
import App from './App.vue';

const app = createApp(App);

app.use(router);

app.mount('#app'); // must be the last one
