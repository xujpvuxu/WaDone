window.onload = function () {
  Vue.createApp({
    data: function () {
      return {
        url: 'https://feather213.azurewebsites.net/api/Excel/Test1',
        // url: 'https://localhost:8080/api/Excel/Test1',
        columns: [],
        responseData: [],
        showData: [],
        selectIndex:0,
        inputValue:''
      };
    },
    watch: {
      'inputValue': function (number) {
        this.changeLocation(number)
      },
      'selectIndex': function (number) {
        this.changeLocation(number)
      },
    },
    methods: {
      changeLocation: changeLocation,
    },
    mounted: function () {
      let self = this;
      console.log("1")
      axios.get(self.url, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          self.responseData = response.data;
          self.columns = self.responseData.shift().map((x, index) => {
            return {
              name: x,
              id: index,
              selected: false,
            };
          });
          self.showData = self.responseData;

          console.log(response);
        })
    },
  }).mount("#app");

  // 選擇物件的Index
  function changeLocation(number)
  {
    this.showData = this.responseData.filter(x => x[this.selectIndex].includes(this.inputValue));
  }
};
