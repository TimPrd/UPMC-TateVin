<template>
    <!-- Card -->
    <section id="userProfile">
        <b-container v-if="oUser.username.length > 0" class="bv-example-row">

            <div v-if="isEdit"> <!-- && oUser.username === store.usr.username-->
                <h2 class="margin-bottom-25">Modification du profil</h2>
                <b-row class="margin-top-10 margin-bottom-25">
                    <b-col sm="3">
                        <label for="dropzone"> Nouvelle image </label>
                    </b-col>
                    <b-col sm="9">
                        <vue-dropzone
                            ref="userAvatar"
                            id="dropzone"
                            :options="dropzoneOptions"
                            @vdropzone-complete="afterComplete"
                        />
                    </b-col>
                </b-row>
                <b-row class="margin-bottom-25">
                    <b-col sm="3"><label> Nom d'utilisateur </label></b-col>
                    <b-col sm="9">
                        <b-form-input v-model="uUser.username" type="text"></b-form-input>
                    </b-col>
                </b-row>

                <b-row class="margin-bottom-25">
                    <b-col sm="3"><label> E-mail </label></b-col>
                    <b-col sm="9">
                        <b-form-input v-model="uUser.email" type="email"></b-form-input>
                    </b-col>
                </b-row>

                <b-row class="margin-bottom-25">
                    <b-col sm="3"><label> Date de naissance </label></b-col>
                    <b-col sm="9">
                        <b-form-input v-model="uUser.birthday" type="date"></b-form-input>
                    </b-col>
                </b-row>

                <b-row class="margin-bottom-25">
                    <b-col sm="3"><label> Description </label></b-col><!-- wysiwyg-->
                    <b-col sm="9">
                        <b-form-input v-model="uUser.description" type="text"></b-form-input>
                    </b-col>
                </b-row>

                <!-- <b-row>
                     <b-col sm="3"><label> Ancien mot de passe </label></b-col>
                     <b-col sm="9"><b-form-input v-model="uUser.mdp" type="password"></b-form-input></b-col>
                 </b-row>

                 <b-row>
                     <b-col sm="3"><label> Nouveau mot de passe </label></b-col>
                     <b-col sm="9"><b-form-input v-model="uUser.mdpNew" type="password"></b-form-input></b-col>
                 </b-row>-->
                <button class="text-center wine-btn btn-purple" @click="update()" >Mettre à jour</button>
                <button class="text-center wine-btn btn-purple" @click="isEdit=false">Cancel</button>
            </div>

            <div v-else>
                <b-img v-if="oUser.avatar" center :src="oUser.avatar" class="profile-img text-center" alt="profile image"></b-img>
                <b-img v-else center :src="require('./../assets/img/profile/default.svg')" class="profile-img text-center" alt="profile image"></b-img>

                <div class="text-center mt-4 mb-4">
                    <b-col v-if="isCurrentUser()">
                        <button  @click="isEdit=true" class="wine-btn btn-purple">Modifier</button>
                        <button  @click="deleteUser()" class="wine-btn  btn-danger">Supprimer</button>
                    </b-col>
                    <b-col v-else>
                        <div v-if="!isProd()">
                        <b-button disabled v-if="isInSubs(oUser._id)" class="wine-btn btn-purple">Déjà ajouté</b-button>
                        <b-button v-else @click="add(oUser._id)"  class="wine-btn btn-purple">Ajouter</b-button>
                        </div>
                    </b-col>

                </div>

                <b-row class="text-center">
                    <b-col cols="12" class="ink text-center">
                        {{oUser.username}}
                    </b-col>
                    <b-col cols="12" class="text-center">{{age}} ans</b-col>
                    <b-col class="text-center mt-2">{{oUser.description || 'Pas de description'}}</b-col>
                </b-row>

                <b-card no-body class="mt-3">
                    <b-tabs card>
                        <b-tab  :title="'Dernières Activités (' + (this.activity.length || '0') + ')'">
                            <b-button @click="getActi()" class="wine-btn btn-purple text-center center">Voir les activités</b-button>
                            <h1 class="text-center" v-if="activity.length === 0">Aucune activité.. 🍷</h1>
                            <b-list-group v-else v-for="ac in activity">
                                <b-list-group-item >
                                    <b-row>
                                        <b-col cols="2">
                                            <b-img :src="ac.type" rounded="circle"  width="34" height="34" alt="img"/>
                                        </b-col>
                                        <b-col cols="3" class="text-center">  {{ac.score ? ac.score + '/5' : ''}} </b-col>
                                        <b-col cols="4" class="text-center">  <router-link :to="ac.road" >{{ac.roadName}}</router-link> </b-col>
                                        <b-col cols="3" class="text-center"> {{ ac.date }} </b-col>

                                    </b-row>
                                </b-list-group-item>
                            </b-list-group>
                        </b-tab>
                        <b-tab  :title="'Abonnement (' + (this.subsDetails.length || '0') + ')'">
                            <h1 class="text-center" v-if=" subsDetails.length === 0">Aucun abonné.. 🍇</h1>
                            <b-list-group v-else v-for="us in subsDetails">
                                <b-list-group-item>
                                    <b-row>
                                        <b-col cols="2">
                                            <b-img :src="us.avatar" rounded="circle"  width="34" height="34" alt="img"/>
                                        </b-col>
                                        <b-col cols="8">  <router-link :to="'/user/'+us.username">{{us.username}}</router-link> </b-col>
                                        <b-col v-if="isCurrentUser()" cols="2">
                                            <b-button @click="remove(us._id)" class="right">-</b-button>
                                        </b-col>
                                        <b-col v-else>
                                            <div v-if="!isProd()">
                                            <b-button disabled v-if="isInSubs(us._id)" class="right">Déjà ajouté</b-button>
                                            <b-button v-else @click="add(us._id)"  class="right">Ajouter</b-button>
                                            </div>
                                        </b-col>
                                    </b-row>

                                </b-list-group-item>
                            </b-list-group>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </div>

        </b-container>
        <p v-else>
            Aucun utilisateur trouvé 🤔
        </p>

    </section>
    <!-- End card -->
</template>

<style>
    #userProfile {
        margin-top: 15px;
    }

    .ink {
        font-size: 22px;
        font-weight: bold;
        -webkit-text-decoration: #690029 solid underline;
        text-decoration: #690029 solid underline;
        -webkit-text-decoration-skip: ink;
        text-decoration-skip: ink;
    }
</style>
<script>
    import {EventBusModal} from "./../events/";
    import {HTTP} from "./../HTTP/http";
    import vue2Dropzone from "vue2-dropzone";
    import "vue2-dropzone/dist/vue2Dropzone.css";
    import store from './../store';
    import Vue from 'vue';
    import HDVImage  from './../assets/img/hdv.svg'
    import ScoreImage  from './../assets/img/like.svg'
    import moment from 'moment-timezone'
    import Utils from "./../utils/";
    import _ from 'lodash';
    import Auth from '../auth/'

    Vue.use(require('vue-moment'));
    export default {
        data() {
            return {
                dropzoneOptions: {
                    url: "https://httpbin.org/post",
                    thumbnailWidth: 150,
                    maxFiles: 1,
                    maxFilesize: 0.5,
                    addRemoveLinks: true,
                    headers: {"My-Awesome-Header": "header value"},
                    accept: function accept(file, done) {
                        done();
                    }
                },
                oUser: {
                    username: '',
                    birthday: '',
                    description: '',
                },
                subsDetails: [],
                activity:{},
                isEdit: false,

            }
        },
        components: {
            vueDropzone: vue2Dropzone,
        },
        computed: {
            age: function () {
                return moment().diff(new Date(this.oUser.birthday), 'years');
            },
            uUser: function () {
                var clone = Object.assign({}, this.oUser)
                //clone.mdpNew = '',
                //clone.mdp = ''
                return clone;
            },

        },
        mounted() {
            this.loadUser(this.$route.params.username);
        },
        beforeRouteUpdate(to, from, next) {
            this.loadUser(to.params.username)
            next()
        },
        methods: {
            loadUser(path){
                var that =this;
                EventBusModal.$emit("loading-loader", true);
                HTTP.get(`users/` + path).then(response => {
                    this.oUser = response.data[0];
                    if (this.isCurrentUser())
                        store.commit("updateSubs", response.data[0].subscription);
                    if (this.oUser.subscription.length !== 0)
                        HTTP.get(`usersByIds/`, { params: {subs: this.oUser.subscription} } ).then(response => {
                            this.subsDetails = response.data
                        });

                    EventBusModal.$emit("loading-loader", false);
                });
            },
            async getActi(){
                var that=this;
                await HTTP.get('users/'+this.$route.params.username+'/activity').then(r => {
                     this.activity = r.data;
                     this.activity.forEach(element => { that.activityType(element) });
                      console.log(this.activity);
                  })
               },
            deleteUser(){
                HTTP.delete(`users/` + this.oUser._id).then(response => {
                    new Promise( (resolve, reject) => {
                        resolve(Auth.logout(this));
                    }).then(() => {
                        this.$router.push('/');
                    });
                })
            },
            isProd(){
                return store.state.usr.isProd === true
            },
            isInSubs(username) {
                if(!this.isProd())
                    return typeof (store.state.usr.subscription.find(usr => usr === username)) !== 'undefined';
            },
            afterComplete(file) {
                this.uUser.avatar = file.dataURL;
            },
            isCurrentUser() {
                return this.oUser.username === store.state.usr.username
            },
            activityType: async function (ac) {
                if(ac.hasOwnProperty('food'))
                {
                    await HTTP.get("/wine/"+ac.id_wine).then( async response =>{
                        ac.roadName = await  response.data[0].name
                    })
                    ac.type = ScoreImage;
                    ac.road = "/wine/"+ac.id_wine
                    ac.date = Utils.dateLocaleHours(ac.date)

                }
                /*if(ac.hasOwnProperty('like'))
                {
                    ac.type = "./../assets/img/like.svg";
                    ac.road = "/wine/"+ac.id_wine
                    ac.date = Utils.dateLocaleHours(ac.date)
                    await HTTP.get("/wine/"+ac.id_wine).then(async  response =>{

                        ac.roadName = await response.data[0].name
                    })
                }*/
                if(ac.hasOwnProperty('title'))
                {
                    ac.type = HDVImage;
                    ac.road = "/story/"+ac.id
                    ac.date = Utils.dateLocaleHours(ac.date)
                    ac.roadName = _.truncate(ac.title, {'length': 25})
                }

            },
            update() {
                EventBusModal.$emit("loading-loader", true);
                HTTP.put(`users/` + this.oUser.username, this.uUser).then(response => {
                    response.data.isProd = this.isProd() ? true : false;
                    store.commit("instanceUser", response.data);
                    EventBusModal.$emit("loading-loader", false);
                    this.$router.push('/user/'+this.oUser.username)
                });
            },
            add(idUserToAdd) {
                EventBusModal.$emit("loading-loader", true);
                HTTP.put(`users/` + store.state.usr.username + '/' + idUserToAdd).then(response => {
                    store.commit("incrementSubs", idUserToAdd);
                    EventBusModal.$emit("loading-loader", false);
                })
            },
            remove(idUserToRm) {
                EventBusModal.$emit("loading-loader", true);
                HTTP.delete(`users/` + store.state.usr.username + '/' + idUserToRm).then(response => {
                    this.subsDetails = this.subsDetails.filter( ids => ids._id !== idUserToRm);
                    store.commit("updateSubs", response.data);
                    EventBusModal.$emit("loading-loader", false);
                });
            }
        },
    }
</script>
