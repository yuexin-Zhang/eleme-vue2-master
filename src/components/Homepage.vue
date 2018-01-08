<template>
  <div class="index_main">
    <!-- 首页 -->
    <div class="index_header">
      <!-- 地址 -->
      <div class="index_location">
        <div class="location_left ell">
          <svg class="v-md">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#location"></use>
          </svg>
          <span class="v-md">{{showDate}}</span>
          <span class="v-md" style="float: right">{{nickName}}</span>
        </div>
        <!-- 登录按钮 -->
        <div class="index_login" v-if="!getLogin">
          <router-link to="/login">登录</router-link>
        </div>
      </div>
    </div>
    <!-- 撑开Fixednav挡住的位置 -->
    <div class="space">
      <div v-if="selectIndex == 0">
        <div class="menu-group">
          <img src="../images/icon-wu.png">
          <div class="title">今日中餐菜谱预览</div>
          <div class="btn-group" v-if="Time > -1 && Time < 9">
            <div v-if="!orderTodayLunch" class="btn" @click="orderTodayMeal(2)">预定午餐</div>
            <div v-else class="btn red" @click="unorderTodayMeal(2)">取消预定午餐</div>
          </div>
          <div v-else class="btn-group" >
            <div v-if="!orderTodayLunch">
              <div class="btn gray"">无法订餐</div>
            </div>
            <div v-else>
              <div v-if="!confirmLunch" class="btn green" @click="confirmMeal(2)">确认就餐</div>
              <div v-else class="btn gray"">已就餐</div>
            </div>
          </div>
          <table class="menu-list" style="width:100%"> 
            <tr>
              <th v-for="lunch in todayLunchList">
                <img :src="lunch.ImageLocation" class="menuImage">
                <p>{{lunch.MenuName}}</p>
              </th>
            </tr>
          </table>
<!--           <div v-if="Time > -1 && Time < 9">
            <div v-if="!orderTodayLunch" class="btn" @click="orderTodayMeal(2)">预定午餐</div>
            <div v-else class="btn red" @click="unorderTodayMeal(2)">取消预定午餐</div>
          </div>
          <div v-else>
            <div v-if="!confirmLunch" class="btn green" @click="confirmMeal(2)">确认就餐</div>
            <div v-else class="btn gray"">已就餐</div>
          </div> -->
        </div>
        <div class="menu-group">
          <img src="../images/icon-wan.png">
          <div class="title">今日晚餐菜谱预览</div>
          <div class="btn-group" v-if="Time > -1 && Time < 8">
            <div v-if="!orderTodayDinner" class="btn" @click="orderTodayMeal(3)">预定晚餐</div>
            <div v-else class="btn red" @click="unorderTodayMeal(3)">取消预定晚餐</div>
          </div>
          <div v-else class="btn-group">
            <div v-if="Time > 8 && Time < 16">
                <div v-if="orderTodayDinner">
                  <div class="btn red" @click="unorderTodayMeal(3)">取消预定晚餐</div>
                </div>
                <div v-else>
                  <div class="btn gray"">无法订餐</div>
                </div>
            </div>
            <div v-else>
              <div v-if="orderTodayDinner">
                  <div v-if="!confirmDinner" class="btn green" @click="confirmMeal(3)">确认就餐</div>
                  <div v-else class="btn gray"">已就餐</div>
              </div>
              <div v-else>
                <div class="btn gray"">无法订餐</div>
              </div>
            </div>
          </div>
          <table class="menu-list" style="width:100%"> 
            <tr>
              <th v-for="dinner in todayDinnerList">
                <img class="menuImage" :src="dinner.ImageLocation">
                <p>{{dinner.MenuName}}</p>
              </th>
            </tr>
          </table>
          <!-- <div v-if="Time > -1 && Time < 17">
            <div v-if="!orderTodayDinner" class="btn" @click="orderTodayMeal(3)">预定晚餐</div>
            <div v-else class="btn red" @click="unorderTodayMeal(3)">取消预定晚餐</div>
          </div>
          <div v-else>
            <div v-if="!confirmDinner" class="btn green" @click="confirmMeal(3)">确认就餐</div>
            <div v-else class="btn gray"">已就餐</div>
          </div> -->
        </div>
      </div>

      <div :class="selectIndex == 0 && 'hide-group'">
        <div class="menu-group">
          <img src="../images/icon-wu.png">
          <div class="title">明日中餐菜谱预览</div>
          <div class="btn-group">
            <div v-if="!orderTommLunch" class="btn" @click="orderTommMeal(2)">预定午餐</div>
            <div v-else class="btn red" @click="unorderTommMeal(2)">取消预定午餐</div>
          </div>
          <table class="menu-list" style="width:100%"> 
            <tr>
              <th v-for="lunch in tommLunchList">
                <img :src="lunch.ImageLocation" width="140" height="140">
                <p>{{lunch.MenuName}}</p>
              </th>
            </tr>
          </table>
          <!-- <div v-if="!orderTommLunch" class="btn" @click="orderTommMeal(2)">预定午餐</div>
          <div v-else class="btn red" @click="unorderTommMeal(2)">取消预定午餐</div> -->
        </div>

        <div class="menu-group">
          <img src="../images/icon-wan.png">
          <div class="title">明日晚餐菜谱预览</div>
          <div class="btn-group">
            <div v-if="!orderTommDinner" class="btn" @click="orderTommMeal(3)">预定晚餐</div>
            <div v-else class="btn red" @click="unorderTommMeal(3)">取消预定晚餐</div>
          </div>
          <table class="menu-list" style="width:100%"> 
            <tr>
              <th v-for="dinner in tommDinnerList">
                <img :src="dinner.ImageLocation" width="140" height="140">
                <p>{{dinner.MenuName}}</p>
              </th>
            </tr>
          </table>
          <!-- <div v-if="!orderTommDinner" class="btn" @click="orderTommMeal(3)">预定晚餐</div>
          <div v-else class="btn red" @click="unorderTommMeal(3)">取消预定晚餐</div> -->
        </div>
      </div>
      
      <!-- <ul class="table-equal">
        <li>
          
        </li>
        <li>
          <img src="http://47.96.184.230/canteen/menuImage/白菜炒肉.jpg" width="100" height="100">
        </li>
        <li>
          <img src="http://47.96.184.230/canteen/menuImage/白菜炒肉.jpg" width="100" height="100">
        </li>
      </ul> -->
    </div>
    <!-- 固定导航栏 -->
    <!-- <Fixednav></Fixednav> -->
    <div class="footer">
      <div class="tab" @click="selectTab(0)">
        <img v-if="selectIndex == 0" src="../images/icon-confrim.png" width="64" height="64">
        <img v-else src="../images/icon-unconfrim.png" width="64" height="64">
        <p :class="['tab-title',selectIndex == 0 && 'select']">确认就餐</p>
      </div>
      <div class="tab" @click="selectTab(1)">
        <img v-if="selectIndex == 1" src="../images/icon-order.png" width="64" height="64">
        <img v-else src="../images/icon-unorder.png" width="64" height="64">
        <p :class="['tab-title',selectIndex == 1 && 'select']">预约订餐</p>
      </div>
      
    </div>
  </div>
</template>

<script>
import Fixednav from './small_components/Fixed_nav';
import { mapGetters } from 'vuex';
import axios from 'axios';
import qs from 'qs';
import Utils from '../js/utils.js';

export default {
  name: 'homepage',
  data () {
    return {
      showMe: true, // 是否展示当前页面
      showDate: '',
      nickName: '',
      today: '',
      tommorrow: '',
      Time: 0,
      todayLunchList: [],
      todayDinnerList: [],
      tommLunchList: [],
      tommDinnerList: [],
      selectIndex: 0,
      show1: false,
      confirmLunch: false,
      confirmDinner: false,
      orderTodayLunch: false,
      orderTommLunch: false,
      orderTodayDinner: false,
      orderTommDinner: false
    };
  },
  mounted () {
  },
  created () {
    if (!this.$store.state.isLogin) {
      this.$router.replace('/login');
    }
    let vm = this;
    vm.Time = new Date().getHours();
    axios.post('http://47.96.184.230/canteen/queryNickName.php', qs.stringify({
      'EmployeeId': sessionStorage.getItem('EmployeeId')
    })).then(function (res) {
      let data = res.data;
      if (data.return_code === 1) {
        vm.nickName = data.return_msg;
      }
    }).catch(function (error) {
      Utils.toast(error, 500);
    });
    vm.today = Utils.getDayAndTime().today;
    vm.tommorrow = Utils.getTommorrow();
    vm.showDate = '今日就餐时间：' + vm.today;
    vm.getTodayMenuList(vm.today);
    vm.getTommorrowMenuList(vm.tommorrow);
    axios.post('http://47.96.184.230/canteen/queryEmployeeOrderInfo.php', qs.stringify({
      EatingDate: vm.today,
      EmployeeId: sessionStorage.getItem('EmployeeId')
    })).then(function (res) {
      let data = res.data;
      if (data.return_code === 1) {
        console.log(data.return_msg);
        data.return_msg.forEach((item, index) => {
          if (item.EatingTime === '2') {
            if (item.Status === '-1') {
              vm.orderTodayLunch = false;
            }
            if (item.Status === '0') {
              vm.orderTodayLunch = true;
            }
            if (item.Status === '1' || item.Status === '4') {
              vm.orderTodayLunch = true;
              vm.confirmLunch = true;
            }
          };
          if (item.EatingTime === '3') {
            if (item.Status === '-1') {
              vm.orderTodayDinner = false;
            }
            if (item.Status === '0') {
              vm.orderTodayDinner = true;
            }
            if (item.Status === '1' || item.Status === '4') {
              vm.orderTodayDinner = true;
              vm.confirmDinner = true;
            };
          };
        });
      }
    }).catch(function (error) {
      Utils.toast(error, 500);
    });
    axios.post('http://47.96.184.230/canteen/queryEmployeeOrderInfo.php', qs.stringify({
      EatingDate: vm.tommorrow,
      EmployeeId: sessionStorage.getItem('EmployeeId')
    })).then(function (res) {
      let data = res.data;
      if (data.return_code === 1) {
        console.log(data.return_msg);
        data.return_msg.forEach((item, index) => {
          if (item.EatingTime === '2') {
            if (item.Status === '0') {
              vm.orderTommLunch = true;
            }
          };
          if (item.EatingTime === '3') {
            if (item.Status === '0') {
              vm.orderTommDinner = true;
            }
          };
        });
      }
    }).catch(function (error) {
      Utils.toast(error, 500);
    });
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.dispatchLoad, false);
  },
  computed: {
    // 使用对象展开运算符将 getters 混入 computed 对象中
    // 等同于
    // isLogin () {
    //   return this.$store.getters.getLogin
    // }
    // 能少写不少代码
    ...mapGetters([
      'getLogin',
      'getFalseHotWord',
      'getFalseBussinessbrief' // 商家简略信息
    ])
  },
  methods: {
    getTodayMenuList (date) {
      let vm = this;
      axios.post('http://47.96.184.230/canteen/getOneDayMenu.php', qs.stringify({
        EatingDate: date
      })).then(function (res) {
        let data = res.data;
        if (data.return_code === 1) {
          vm.todayLunchList = data.return_msg.lunch;
          vm.todayDinnerList = data.return_msg.dinner;
        }
      }).catch(function (error) {
        Utils.toast(error, 500);
      });
    },
    getTommorrowMenuList (date) {
      let vm = this;
      axios.post('http://47.96.184.230/canteen/getOneDayMenu.php', qs.stringify({
        EatingDate: date
      })).then(function (res) {
        let data = res.data;
        if (data.return_code === 1) {
          vm.tommLunchList = data.return_msg.lunch;
          vm.tommDinnerList = data.return_msg.dinner;
          console.log(vm.tommLunchList);
          console.log(vm.tommDinnerList);
        }
      }).catch(function (error) {
        Utils.toast(error, 500);
      });
    },
    orderTodayMeal (time) {
      let vm = this;
      axios.post('http://47.96.184.230/canteen/makeOrder.php', qs.stringify({
        'EmployeeId': sessionStorage.getItem('EmployeeId'),
        'EatingDate': Utils.getDayAndTime().today,
        'EatingTime': time
      })).then(function (res) {
        let data = res.data;
        if (data.return_code === 1) {
          if (time === 2) {
            vm.orderTodayLunch = true;
            Utils.toast('预定今日午餐成功', 500);
          }
          if (time === 3) {
            vm.orderDinner = true;
            Utils.toast('预定今日晚餐成功', 500);
          }
        } else {
          if (data.return_msg === 'Already has order') {
            Utils.toast('无需重复预约', 500);
          }
        }
      }).catch(function (error) {
        Utils.toast(error, 500);
      });
    },
    orderTommMeal (time) {
      let vm = this;
      axios.post('http://47.96.184.230/canteen/makeOrder.php', qs.stringify({
        'EmployeeId': sessionStorage.getItem('EmployeeId'),
        'EatingDate': Utils.getTommorrow(),
        'EatingTime': time
      })).then(function (res) {
        let data = res.data;
        if (data.return_code === 1) {
          if (time === 2) {
            vm.orderTommLunch = true;
            Utils.toast('预定明日午餐成功', 500);
          }
          if (time === 3) {
            vm.orderTommDinner = true;
            Utils.toast('预定明日晚餐成功', 500);
          }
        } else {
          if (data.return_msg === 'Already has order') {
            Utils.toast('无需重复预约', 500);
          }
        }
      }).catch(function (error) {
        Utils.toast(error, 500);
      });
    },
    // orderMeal (time) {
    //   let vm = this;
    //   let Time = new Date().getHours();
    //   if ((Time > -1 && Time < 9) || (Time > 15 && Time < 24)) {
    //     axios.post('http://47.96.184.230/canteen/makeOrder.php', qs.stringify({
    //       'EmployeeId': sessionStorage.getItem('EmployeeId'),
    //       'EatingDate': Time > -1 && Time < 9 ? Utils.getDayAndTime().today : Utils.getTommorrow(),
    //       'EatingTime': time
    //     })).then(function (res) {
    //       let data = res.data;
    //       if (data.return_code === 1) {
    //         if (time === 2) {
    //           vm.orderLunch = true;
    //           if (Time > -1 && Time < 9) {
    //             Utils.toast('预定今日午餐成功', 500);
    //           } else {
    //             Utils.toast('预定明日午餐成功', 500);
    //           }
    //         }
    //         if (time === 3) {
    //           vm.orderDinner = true;
    //           if (Time > -1 && Time < 9) {
    //             Utils.toast('预定今日晚餐成功', 500);
    //           } else {
    //             Utils.toast('预定明日晚餐成功', 500);
    //           }
    //         }
    //       } else {
    //         if (data.return_msg === 'Already has order') {
    //           Utils.toast('无需重复预约', 500);
    //         }
    //       }
    //     }).catch(function (error) {
    //       Utils.toast(error, 500);
    //     });
    //   } else {
    //     Utils.toast('当前时段不可订餐', 500);
    //   }
    // },
    unorderTodayMeal (time) {
      let vm = this;
      axios.post('http://47.96.184.230/canteen/unorder.php', qs.stringify({
        'EmployeeId': sessionStorage.getItem('EmployeeId'),
        'EatingDate': Utils.getDayAndTime().today,
        'EatingTime': time
      })).then(function (res) {
        let data = res.data;
        if (data.return_code === 1) {
          if (time === 2) {
            vm.orderTodayLunch = false;
            Utils.toast('取消今日午餐预定成功', 500);
          }
          if (time === 3) {
            vm.orderTodayDinner = false;
            Utils.toast('取消今日晚餐预定成功', 500);
          }
        } else {
          if (data.return_msg === 'Already has unorder') {
            Utils.toast('无需重复取消', 500);
          }
        }
      }).catch(function (error) {
        Utils.toast(error, 500);
      });
    },
    unorderTommMeal (time) {
      let vm = this;
      axios.post('http://47.96.184.230/canteen/unorder.php', qs.stringify({
        'EmployeeId': sessionStorage.getItem('EmployeeId'),
        'EatingDate': Utils.getTommorrow(),
        'EatingTime': time
      })).then(function (res) {
        let data = res.data;
        if (data.return_code === 1) {
          if (time === 2) {
            vm.orderTommLunch = false;
            Utils.toast('取消明日午餐预定成功', 500);
          }
          if (time === 3) {
            vm.orderTommDinner = false;
            Utils.toast('取消明日晚餐预定成功', 500);
          }
        } else {
          if (data.return_msg === 'Already has unorder') {
            Utils.toast('无需重复取消', 500);
          }
        }
      }).catch(function (error) {
        Utils.toast(error, 500);
      });
    },
    // unorderMeal (time) {
    //   let vm = this;
    //   let Time = new Date().getHours();
    //   if ((Time > -1 && Time < 9) || (Time > 15 && Time < 24)) {
    //     axios.post('http://47.96.184.230/canteen/unorder.php', qs.stringify({
    //       'EmployeeId': sessionStorage.getItem('EmployeeId'),
    //       'EatingDate': Time > -1 && Time < 9 ? Utils.getDayAndTime().today : Utils.getTommorrow(),
    //       'EatingTime': time
    //     })).then(function (res) {
    //       let data = res.data;
    //       if (data.return_code === 1) {
    //         if (time === 2) {
    //           vm.orderLunch = false;
    //           if (Time > -1 && Time < 9) {
    //             Utils.toast('取消今日午餐预定成功', 500);
    //           } else {
    //             Utils.toast('取消明日午餐预定成功', 500);
    //           }
    //         }
    //         if (time === 3) {
    //           vm.orderDinner = false;
    //           if (Time > -1 && Time < 9) {
    //             Utils.toast('今日晚餐取消预定成功', 500);
    //           } else {
    //             Utils.toast('明日晚餐取消预定成功', 500);
    //           }
    //         }
    //       } else {
    //         if (data.return_msg === 'Already has unorder') {
    //           Utils.toast('无需重复取消', 500);
    //         }
    //       }
    //     }).catch(function (error) {
    //       Utils.toast(error, 500);
    //     });
    //   } else {
    //     Utils.toast('当前时段不可取消订餐', 500);
    //   }
    // },
    confirmMeal (time) {
      console.log(Utils.getTommorrow());
      axios.post('http://47.96.184.230/canteen/signIn.php', qs.stringify({
        'EmployeeId': sessionStorage.getItem('EmployeeId'),
        'EatingTime': time
      })).then(function (res) {
        let data = res.data;
        if (data.return_code === 1) {
          Utils.toast('就餐成功', 500);
        } else {
          if (data.return_msg === 'already sign in') {
            Utils.toast('无需重复确认', 500);
          }
          if (data.return_msg === 'No such record') {
            Utils.toast('请先预定', 500);
          }
        }
      }).catch(function (error) {
        Utils.toast(error, 500);
      });
    },
    selectTab (index) {
      this.selectIndex = index;
      if (index === 0) {
        this.showDate = '今日就餐时间：' + this.today;
      } else {
        this.showDate = '明日预约时间：' + this.tommorrow;
      }
    }
  },
  components: {
    Fixednav
  }
};
</script>

<style lang="less">
@baseBlue: #0096ff;
@com_gray1: #666;
@com_gray2: #999;
.com_gray1{
  color:@com_gray1;
}
.com_gray2{
  color:@com_gray2;
}
.com_blue{
  color:@baseBlue;
}

.index_main{
  width: 10rem;
  overflow:hidden; 
  .index_header{
    background:@baseBlue;
    height:1.2rem;
    padding:.26rem;
    box-sizing:border-box;
    overflow:hidden;
    .index_location{
      height:.9rem;
      color:#fff;
      width:10rem;
      font-size:.4rem;
      .location_left{
        width:9rem;
        svg{
          width:.5rem;
          height:.5rem;
        }
      }
      .index_login{
        position: absolute;
        height:1rem;
        font-size:.35rem;
        right: 0;
        top: 0;
        line-height:1rem;
        padding:0 .2rem;
        a{
          color:#fff;
        }
        
      }
    }
    /* 搜索 */
    .search_box{
      width:9rem;
      margin: 0 auto;
      height:.9rem;
      input[type="text"]{
        width:100%;
        height:.9rem;
        outline:none;
        font-size:.4rem;
        text-align: center;
        border:none;
        display:block;
        border-radius:.45rem;
      }
    }
    /* 热搜 */
    .hot_word{
      height:1.2rem;
      line-height:.9rem;
      font-size:.3rem;
      width:9.48rem;
      overflow-x:auto;
      white-space: nowrap;
      span{
        padding:0 .1rem;
      }
      a{
        color:#fff;
      }

    }
  }
  .index_banner{
    height:4.6rem;
    background:#fff;
    margin-bottom:0.2rem;
    .common_slider{
      width:2.5rem;
      height:2rem;
      float: left;
      img{
        margin: 0 auto;
        display:block;
        width:1.2rem;
        height:1.2rem;
        margin-top:.2rem;
      }
      p{
        text-align:center;
        font-size: .3rem;
      }
    }
  }
  .index_title{
    line-height: .8rem;
    font-weight: 600;
    background: #fff;
    border-top: 1px solid #eee;
    font-size: .4rem;
    padding-left: .4rem;
  }
  .space{
    width:10rem;
    height: auto;
    .hide-group {
      visibility: hidden;
      position: absolute;
      z-index: 999;
      top: 0;
    }
    .menu-group {
      /*padding: 0 0.1rem;*/
      margin-top: 0.3rem;
      position: relative;
      &:last-child {
        margin-top: 1.2rem;
      };
      img {
        display: inline-block;
      }
      .title {
        display: inline-block;
        font-size: 0.5rem;
        margin-bottom: 0.35rem;
        margin-left: -0.15rem;
        vertical-align: middle;
      }
      .btn-group {
        position: absolute;
        right: 0.4rem;
        top: -0.2rem;
      }
      .menu-list {
        /*width: 100%;*/
        padding: 0 0.1rem;
        p {
          font-weight: normal;
          font-size: 0.4rem;
        }
        .menuImage {
          width: 1.8rem;
          height: 1.8rem;
        }
      }
      .btn {
        display: inline-block;
        font-size: 0.4rem;
        border: 1px solid #2193fc;
        color: #2193fc;
        border-radius: 0.1rem;
        padding: 0.1rem 0.2rem;
        margin-left: 0.5rem;
        &.green {
          border: 1px solid #69c447;
          color: #69c447;
        }
        &.gray {
          border: 1px solid #cccccc;
          color: #cccccc;
        }
        &.red {
          border: 1px solid #F56C6C;
          color: #F56C6C;
        }
      }
    }
  }
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  .tab {
    /*display: inline-block;*/
    width: 49%;
    display: flex;
    float: left;
    align-items: center;
    justify-content: center;
    padding-bottom: 0.2rem;
    .tab-title {
      margin-left: 0.2rem;
      font-size: 0.4rem;
      &.select {
        color: #efb336;
      }
    }
  }
}
/* slider插件css + 改写*/
.mint-swipe,.mint-swipe-items-wrap{overflow:hidden;position:relative;height:100%}.mint-swipe-items-wrap>div{position:absolute;-webkit-transform:translateX(-100%);transform:translateX(-100%);width:100%;height:100%;display:none}.mint-swipe-items-wrap>div.is-active{display:block;-webkit-transform:none;transform:none}.mint-swipe-indicators{position:absolute;bottom:10px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.mint-swipe-indicator{width:.1rem;height:.1rem;display:inline-block;border-radius:50%;background:#ccc;margin:0 3px}.mint-swipe-indicator.is-active{background:@baseBlue}

</style>
