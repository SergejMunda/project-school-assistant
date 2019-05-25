<template>
  <v-layout row justify-left>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn flat color="grey" v-on="on">Zamenjaj geslo</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Zamenjaj geslo</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Staro geslo*"  type="password" required v-model="oldPass" ></v-text-field>
              </v-flex>
              <v-flex xs12 v-show="wrongPass">
                Napačno geslo
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Novo geslo*" type="password" required v-model="newPass"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Ponovno vnesi novo geslo*" :error-messages='passwordMatchError()' type="password" required v-model="confirmPass"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*Obvezna polja</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Zapri</v-btn>
          <v-btn color="blue darken-1" flat @click="submit">Shrani</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
    import axios from "axios";
    export default {
        data(){
            return{
                dialog: false,
                oldPass:"", 
                newPass:"",
                confirmPass:"",
                wrongPass : false,
            }
        },
           
        
        /*beforeMount() {
            this.token = window.localStorage.getItem("accToken");
        },*/
        methods: {
            submit(){
                if(this.newPass=== this.confirmPass){
                    
                    axios({
                        method :'post',
                        url : 'http://localhost:3000/api/Users/change-password',
                        data : {'oldPassword': this.oldPass, 'newPassword': this.newPass},
                        headers :{Authorization: ''+ window.localStorage.getItem('accToken') }
                        
                    })
                      .then(response =>{
                        this.dialog = false;
                        this.wrongPass = false;
                        console.log(response)
                        
                    })
                    .catch(error => {
                        this.wrongPass = true;
                        console.error(error);
                    })
                }
            },
            passwordMatchError () { 
                return (this.newPass === this.confirmPass) ? '' : 'Password must match'
             },
           
        },
    }
</script>