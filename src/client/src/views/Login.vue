<template>
    <v-container fluid fill-height class="loginOverlay">
        <v-layout flex align-center justify-center>
            <v-flex xs12 sm4 elevation-6>
            <v-toolbar class="pt-5 blue darken-4">
                <v-toolbar-title class="white--text"><h4>Welcome Back</h4></v-toolbar-title>
                </v-toolbar-items>
            </v-toolbar>
            <v-card>
            <v-card-text class="pt-4">
                <div>
                    <v-form v-model="valid3" ref="form">
                    <v-text-field
                        label="Enter your e-mail address"
                        v-model="user.email"
                        :rules="emailRules"
                        required
                    ></v-text-field>
                    <v-text-field
                        label="Enter your password"
                        v-model="user.password"
                        min="8"
                        :append-icon="e1 ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => (e1 = !e1)"
                        :type="e1 ? 'password' : 'text'"
                        :rules="passwordRules"
                        counter
                        required
                    ></v-text-field>
                    <v-layout justify-space-between>
                        <v-btn @click="login" :class=" { 'blue darken-4 white--text' : valid1, disabled: !valid1 }">Login</v-btn>
                        <v-btn @click="toRegistration" :class=" { 'blue darken-4 white--text' : valid2, disabled: !valid2 }">Register</v-btn>
                       
                    </v-layout>
                    </v-form>
                </div>
            </v-card-text>
            </v-card>
        </v-flex>
        </v-layout>
</v-container>
</template>

<script>
import axios from "axios";
export default {
     data() {
        return {
        valid1: false,
        valid2: false,
        valid3:"",
        e1: true,
        user: { email: "", password: "" },
        passwordRules: [
              (v) => !!v || 'Password is required',
            ],
        emailRules: [
              (v) => !!v || 'E-mail is required',
              (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
        posts : [],
        loading: false,
        dialog: false,

        }
    },

    methods: {
        login() {
             if (this.$refs.form.validate()) {
                axios.post('http://localhost:3000/api/Users/login', this.user).then(response => {
                    console.log(response)
                    this.token = response.data.id
                    localStorage.setItem('accToken', this.token)
                    this.$router.push('home')
                })
                    .catch(error => {
                    localStorage.removeItem('accToken')
                    console.error(error);
                });
                
             }
        },

        toRegistration(){
            this.$router.push('register')
        }
    },

    
    
}
</script>

