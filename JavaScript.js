window.onload = function () {
  Vue.createApp({
    data: function () {
      return {
        url: 'https://feather213.azurewebsites.net/api/WaDone',
        //url: 'https://localhost:8080/api/WaDone',
        postData: {
          start: {
            properity: 1,
            energy: 1
          },
          end: {
            properity: 1,
            energy: 1
          },
          pathCount: 0,
          wood: {
            count: 0,
            trans: 0
          },
          fire: {
            count: 0,
            trans: 0
          },
          dust: {
            count: 0,
            trans: 0
          },
          gold: {
            count: 0,
            trans: 0
          },
          water: {
            count: 0,
            trans: 0
          },
          task_Properity: 0,
          task_Properity_Count: 0,
          task_TransProperity: 0,

          needResult: true,
          startPath_0: {
            x: 0,
            y: 0
          },
          startPath_1: {
            x: 0,
            y: 0
          },
          endPath_0: {
            x: 0,
            y: 0
          },
          endPath_1: {
            x: 0,
            y: 0
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
        ProcessType: 0,
        chooseValue: true,
        isFindingAnswer: false
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
      axios.get(this.url,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        })
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
        this.postData.water.count = 23 - (this.postData.wood.count + this.postData.fire.count + this.postData.dust.count + this.postData.gold.count);
        this.fourStatus++;
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
    this.ShowArray = [];
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
    self.isFindingAnswer = true;

    if (self.postData.pathCount % 2 != self.tempPathLimit % 2) {
      this.postData.pathCount++;
    }

    axios.post(self.url,
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
            self.ShowArray[son][add].color = response.data.result[index] + 1;

            // 轉彎圖示設定
            if (response.data.trans.indexOf(response.data.index[index]) >= 0) {

              let diffSource = response.data.index[index] - response.data.index[index - 1];
              let diffTarget = response.data.index[index + 1] - response.data.index[index];

              if (diffSource == 5) {
                self.ShowArray[son][add].text = (diffTarget == 1) ? "└" : "┘";
              } else if (diffSource == 1) {
                self.ShowArray[son][add].text = (diffTarget == -5) ? "┘" : "┐";
              } else if (diffSource == -5) {
                self.ShowArray[son][add].text = (diffTarget == 1) ? "┌" : "┐";
              } else if (diffSource == -1) {
                self.ShowArray[son][add].text = (diffTarget == -5) ? "└" : "┌";
              }
            } else if (index == 0) {
              self.ShowArray[son][add].text = "🐭";
            } else if (index == response.data.index.length - 1) {
              self.ShowArray[son][add].text = "🧀";
            }
          }
          self.isFindingAnswer = false;
        }
      })
  }
};
