window.onload = function () {
  Vue.createApp({
    data: function () {
      return {
        url: 'https://feather213.azurewebsites.net/api/Excel/Test1',
        // url: 'https://localhost:8080/api/Excel/Test1',
        columns:[],
        responseData:[],
        showData:[],
        phone:'',
      };
    },
    watch: {
      'phone':function(number){
        this.showData = this.responseData.filter(x=>x[0].startsWith(number));
      }
    },
    methods: {
    },
    mounted: function () {
      let self = this;
      console.log("1")
      axios.get(self.url,{
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(response => {
              self.responseData = response.data;
              self.columns = self.responseData.shift();
              self.showData = self.responseData;

          console.log(response);
        })
    },
  }).mount("#app");
};
