<template>
  <div class="login_box">
    <Backbar title="轻点食订餐就餐系统"></Backbar>
    <div class="input_login">
      <input type="search" placeholder="用户名" v-model="uname" maxlength="18" autocapitalize="off">
      <input type="password" placeholder="密码" v-model="pwd" maxlength="18" @keydown.enter="cheack_n_p">
      <button @click="cheack_n_p">登录</button>
    </div>
  </div>
</template>

<script>
import Backbar from './small_components/Back_bar';
import { mapGetters } from 'vuex';
import axios from 'axios';
import qs from 'qs';
import Utils from '../js/utils.js';
export default {
  name: 'login',
  data () {
    return {
      uname: '',
      pwd: ''
    };
  },
  mounted () {
    if (this.getLogin) {
      this.$router.replace('/homepage');
    }
  },
  computed: {
    ...mapGetters([
      'getLogin',
      'getuname',
      'getpwd'
    ])
  },
  methods: {
    cheack_n_p () {
      let vm = this;
      if (this.uname === '' || this.pwd === '') {
        alert('用户名或密码不能为空');
        return;
      } else {
        axios.post('http://47.96.184.230/canteen/login.php', qs.stringify({
          'EmployeeName': this.uname,
          'Password': this.pwd
        })).then(function (res) {
          let data = res.data;
          if (data.return_code === 1) {
            sessionStorage.setItem('EmployeeId', vm.uname);
            vm.$store.dispatch('setLogin', true);
            vm.$router.replace('/homepage');
          } else {
            Utils.toast('账号密码错误', 1500);
          }
        }).catch(function (error) {
          console.log(error);
        });
      }
    }
  },
  components: {
    'Backbar': Backbar
  }
};
</script>

<style lang="less" scoped>
.input_login{
  margin-top: 1.35rem; 
  input{
    height: 1rem;
    width: 9rem;
    padding:.6rem;
    box-sizing:border-box;
    border-radius: 0.7rem;
    border-color: transparent;
    outline:none;
    font-size:.45rem;
    display:block;
    margin: 0 auto;
    margin-top: 0.5rem;
  }
  button{
    margin: .6rem auto;
    display:block;
    width: 9rem;
    height: 1rem;
    font-size:.5rem;
    background:#4cd964;
    border:none;
    outline:none;
    color:#fff;
    border-radius:.1rem;
  }
}

</style>
