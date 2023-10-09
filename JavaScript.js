window.onload = function () {
  Vue.createApp({
    data: function () {
      return {
        postData: {
          start: {
            properity: 4,
            energy: 3
          },
          end: {
            properity: 3,
            energy: 3
          },
          pathCount: 7,
          wood: {
            count: 6,
            trans: 1
          },
          fire: {
            count: 5,
            trans: 2
          },
          dust: {
            count: 4,
            trans: 3
          },
          gold: {
            count: 6,
            trans: 2
          },
          water: {
            count: 2,
            trans: 1
          },
          task_Properity: 0,
          task_Properity_Count: 0,
          task_TransProperity: 0,

          needResult: true,
          startPath_0: {
            x: 1,
            y: 1
          },
          startPath_1: {
            x: 2,
            y: 1
          },
          endPath_0: {
            x: 4,
            y: 4
          },
          endPath_1: {
            x: 4,
            y: 3
          },
        },
        properitys: ["木", "火", "土", "金", "水"],

        pointStatus: 0,

        fourStatus: 0,

        tempPathLimit: 0,


        // 結果
        Result: [],
        ResultTrans: [],

        ShowArray: [],

        //額外
        ProcessType: 8,
        chooseValue: true,
        isFullResult: false,
        offLineDetail: false,
        isUpdate: false

      };
    },
    watch: {},
    methods: {
      ClickChooseButton: ClickChooseButton,
      DownloadFile: DownloadFile,
      SetPoint: SetPoint,
      SearchResult: SearchResult,
      SetFourStatus: SetFourStatus
    },
    mounted: function () {
      // 将日期字符串转换为Date对象
      const inputDate = new Date(this.UpdateTime);

      // 获取今天的日期
      const today = new Date();
      if (
        inputDate.getDate() === today.getDate() &&
        inputDate.getMonth() === today.getMonth() &&
        inputDate.getFullYear() === today.getFullYear()
      ) {
        this.isUpdate = true;
      }
    },
  }).mount("#app");


  function ClickChooseButton() {
    if (this.chooseValue) {
      this.ProcessType = 8;
    } else {
      this.ProcessType++;

    }
  }

  function DownloadFile() {
    var url = './WaDone.zip'; // 將網址A替換成你的zip檔案網址
    var fileName = '可愛教主聚集地.zip'; // 下載的檔案名稱

    var link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  }

  function SetPoint(x, y) {

    switch (this.pointStatus) {
      case 0:
        this.postData.startPath_0.x = x;
        this.postData.startPath_0.y = y;
        break;
      case 1:
        this.postData.startPath_1.x = x;
        this.postData.startPath_1.y = y;
        break;
      case 2:
        this.postData.endPath_0.x = x;
        this.postData.endPath_0.y = y;
        break;
      case 3:
        this.postData.endPath_1.x = x;
        this.postData.endPath_1.y = y;
        let diffx = Math.abs(this.postData.endPath_1.x - this.postData.startPath_1.x);
        let diffy = Math.abs(this.postData.endPath_1.y - this.postData.startPath_1.y);
        this.tempPathLimit = diffx + diffy + 3;
        this.postData.pathCount = this.tempPathLimit;
        break;
      default:
        break;
    }

    this.pointStatus++;
    if (this.pointStatus == 4) {
      this.pointStatus = 0;
    }

  }

  function SetFourStatus(count) {
    switch (this.fourStatus) {
      case 0:
        this.postData.wood.count = count;
        break;
      case 1:
        this.postData.wood.trans = count;
        break;
      case 2:
        this.postData.fire.count = count;
        break;
      case 3:
        this.postData.fire.trans = count;
        break;
      case 4:
        this.postData.dust.count = count;
        break;
      case 5:
        this.postData.dust.trans = count;
        break;
      case 6:
        this.postData.gold.count = count;
        break;
      case 7:
        this.postData.gold.trans = count;
        break;
      case 8:
        this.postData.water.count = count;
        break;
      case 9:
        this.postData.water.trans = count;
        break;
      default:
        break;
    }
    this.fourStatus++;
    if (this.fourStatus == 10) {
      this.fourStatus = 0;
    }

  }


  function SearchResult() {
      this.ShowArray=[];
    for (let index = 0; index < 5; index++) {
      let innerArray = [];
      for (let i = 0; i < 5; i++) {
        let obj = {
          color: "",  // 这里可以设置颜色的初始值
          text: ""    // 这里可以设置 Text 的初始值
        };
        innerArray.push(obj);
      }
      this.ShowArray.push(innerArray);
    }

    let self = this;
    axios.get('https://feather213.azurewebsites.net/api/WaDone',
    //axios.post('https://localhost:8080/api/WaDone',
      this.postData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.data.result.length != 0) {
          this.Result = response.data.result;
          this.ResultTrans = response.data.trans;

          for (let index = 0; index < response.data.index.length; index++) {
            const son = parseInt((response.data.index[index] - 1) / 5);
            const add = parseInt((response.data.index[index] - 1) % 5);
            self.ShowArray[son][add].color = response.data.result[index]+1;

            // 轉彎圖示設定
            if (response.data.trans.indexOf(response.data.index[index]) >= 0) {

              let diffSource = response.data.index[index]-response.data.index[index - 1];
              let diffTarget = response.data.index[index]+1-response.data.index[index];

              if(diffSource == 5){
                self.ShowArray[son][add].text = (diffTarget == 1)?"└":"┘";
              } else if(diffSource == 1){
                self.ShowArray[son][add].text = (diffTarget == -5)?"┘":"┐";
              } else if(diffSource == -5){
                self.ShowArray[son][add].text = (diffTarget == 1)?"┌":"┐";
              } else if(diffSource == -1){
                self.ShowArray[son][add].text = (diffTarget == -5)?"└":"┌";
              }
            }else if(index==0){
                self.ShowArray[son][add].text = "🐭";
            }else if(index==response.data.index.length-1){
                self.ShowArray[son][add].text = "🧀";
            }
          }
        }
      })
  }
};
