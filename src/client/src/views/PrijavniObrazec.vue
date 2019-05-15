<template>
    <v-form ref="form" v-model="valid">
      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>
  
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

       <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Password"
        required
      ></v-text-field>
  
      <v-btn
        :disabled="!valid"
        color="success"
        @click="prijava"
      >
        Prijavi se
      </v-btn>
    </v-form>
</template>

<script>
    export default {
        data: () => ({
        valid: true,
        name: '',
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters'
        ],
        password: '',
        passwordRules: [
            v => !!v || 'password is required',
            v => (v && v.length <= 10) || 'password must be less than 10 characters'
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        }),

        methods: {
        prijava () {
            if (this.$refs.form.prijava()) {
            this.snackbar = true
            }
        }
    }
  }
</script>
