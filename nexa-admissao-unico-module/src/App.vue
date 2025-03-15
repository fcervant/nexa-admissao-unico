<template>
  <v-app>
    <v-main>
      <MasterPage />
    </v-main>
  </v-app>
</template>

<script>
import MasterPage from "./pages/MasterPage";

export default {
  name: "App",

  components: {
    MasterPage
  },

  data: () => ({
    //
  })
};
</script>
