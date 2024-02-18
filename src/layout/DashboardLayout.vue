<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Autobid Registry Backoffice"
      title="Autobid Registry-UP Backoffice"
    >
      <template v-slot:links>

        <sidebar-item
          :link="{
            name: 'Vehículos',
            icon: 'ni ni-ambulance text-blue',
            path: '/vehiculos',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Solicitudes',
            icon: 'ni ni-badge text-orange',
            path: '/solicitudes',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Hist. de Scrapeo',
            icon: 'ni ni-paper-diploma text-red',
            path: '/historial_scrapeo',
          }"
        />
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <!-- your content here -->
        <router-view></router-view>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
  },
  data() {
    return {
      sidebarBackground: "vue", //vue|blue|orange|green|red|primary
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
<style lang="scss"></style>
