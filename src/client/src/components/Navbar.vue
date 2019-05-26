<template >
  <nav v-if="$route.path !=='/' && $route.path !=='/register' ">
    <v-snackbar v-model="snackbar" :timeout="4000" color="success">
      <span>Awesome! You added a new project.</span>
      <v-btn flat color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>

    <v-toolbar flat app>
      <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Straight</span>
        <span>As</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- dropdown menu -->
      
      <v-menu offset-y>
        <v-btn slot="activator" color="grey" flat>
          <v-icon left>expand_more</v-icon>
          <span>Menu</span>
        </v-btn>
        <v-list>
          <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-tile-title color="grey">{{ link.text }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-btn @click="signout" flat color="grey">
        <span>Odjava</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
      <v-flex xs12 md5>
        <ChangePass/>
      </v-flex>
      
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app class="primary">
      <v-list>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import axios from "axios";
import ChangePass from "../components/ChangePass.vue";
export default {
   components: {
    ChangePass,
  },
  data() {
    return {
      notRegisterOrLogin : true,
      drawer: false,
      links: [
        { icon: "dashboard", text: "Home", route: "/home" },
        { icon: "fast-food", text: "Food", route: "/projects" },
        { icon: "event-search", text: "Events", route: "/events" },
        { icon: "directions-bus", text: "Bus", route: "/projects" }
      ],
      snackbar: false
    };
  },

  methods: {
    signout(){
      axios.post('http://localhost:3000/api/Users/logout?access_token='+localStorage.getItem('accToken')).then(response =>{
        console.log(response)
        localStorage.removeItem('accToken')
        this.$router.push('/')
      })
        .catch(error => {
        console.error(error);
      });
      
    }
  
  
  },
 
};
</script>
<style>
</style>