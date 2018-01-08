var Utils = (() => {
  var closeToast = () => {
    var load = document.querySelector('.loading');
    if (load) {
      var cover = load.parentNode;
      cover.classList.remove('show');
      setTimeout(function () {
        cover.parentNode && cover.parentNode.removeChild(load.parentNode);
      }, 500);
    }
  };

  var toast = (title, timeout) => {
    // var title = title || '加载中...';
    var load = document.querySelector('.loading');
    if (load) {
      load.title = title;
      return;
    } else {
      document.body.insertAdjacentHTML('beforeend', '<div class="cover show"><div class="loading" title="' + title + '">' + title + '</div></div>');
    }
    if (timeout) {
      setTimeout(() => {
        closeToast();
      }, timeout);
    }
  };

  var getDayAndTime = () => {
    let day = JSON.stringify(new Date().getDate()).length > 1 ? new Date().getDate() : '0' + new Date().getDate();
    let month = JSON.stringify(new Date().getMonth()).length > 1 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1);
    let today = new Date().getFullYear() + '-' + month + '-' + day;
    let EatingTime = 0;
    let now = new Date().getHours();
    if (now >= 10 && now <= 14) {
      EatingTime = 2;
    }
    if (now >= 16 && now <= 20) {
      EatingTime = 3;
    }
    return {
      today: today,
      EatingTime: EatingTime
    };
  };
  var getTommorrow = () => {
    var day = new Date();
    day.setTime(day.getTime() + 24 * 60 * 60 * 1000);
    var date = JSON.stringify(day.getDate());
    if (date.length === 1) {
      date = '0' + day.getDate();
    }
    var month = JSON.stringify(new Date().getMonth()).length > 1 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1);
    return day.getFullYear() + '-' + month + '-' + date;
  };
  return {
    toast: toast,
    getDayAndTime: getDayAndTime,
    getTommorrow: getTommorrow
  };
})();

export default Utils;
