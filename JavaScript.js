window.onload = function () {
    Vue.createApp({
        data: function () {
            return {
                // 剩餘
                WoodCount: 0,
                FireCount: 0,
                DustCount: 0,
                GoldCount: 0,
                WaterCount: 0,

                PathCount: 0,

                //起始
                selectedStartProperity: "木",
                startEnergy: 1,

                //中間
                selectedMiddleProperity: "木",
                selectedMiddlePath: 0,

                //結尾
                selectedEndProperity: "木",
                endEnergy: 1,

                // 其他
                properitys: ["木", "火", "土", "金", "水"],
                middlePath: [0, 1, 2, 3, 4, 5, 6, 7],

                // 結果
                Result: [],
                ResultCount: 0,
            }
        },
        watch: {
        },
        methods: {
            SearchResult: SearchResult,
            Go: Go,
        },
        mounted: function () {
        },
    }).mount('#app');
    function SearchResult() {
        this.ResultCount = 0;
        this.Result = [];
        this.Go(this.selectedStartProperity, this.startEnergy, 0, 0, 0, 0, 0, 0, []);
    }
    function Go(startPro, startEng, wood, fire, dust, gold, water, path, process) {
        path++;
        if (path < this.PathCount + 1 && this.ResultCount <= 100) {
            for (let i = 0; i < 5; i++) {
                let tempStartPro = startPro;
                let tempStartEng = startEng;
                let tempWood = wood;
                let tempFire = fire;
                let tempDust = dust;
                let tempGold = gold;
                let tempWater = water;

                let isRun = false;

                let tempProcess = JSON.parse(JSON.stringify(process))
                switch (this.properitys[i]) {
                    case "木":
                        tempWood++;
                        if (tempWood <= this.WoodCount) {
                            isRun = true;
                            switch (startPro) {
                                case "木":
                                    break;
                                case "火":
                                    tempStartEng++;
                                    break;
                                case "土":
                                    tempStartEng--;
                                    break;
                                case "金":
                                    tempStartEng--;
                                    break;
                                case "水":
                                    tempStartPro = "木"
                                    break;

                            }
                        }
                        break;
                    case "火":
                        tempFire++;
                        if (tempFire <= this.FireCount) {
                            isRun = true;
                            // 一開始屬性 遇到火
                            switch (startPro) {
                                case "木":
                                    tempStartPro = "火";
                                    break;

                                case "火":
                                    break;

                                case "土":
                                    tempStartEng++;
                                    break;

                                case "金":
                                    tempStartEng--;
                                    break;

                                case "水":
                                    tempStartEng--;
                                    break;
                            }
                        }
                        break;
                    case "土":
                        tempDust++;
                        if (tempDust <= this.DustCount) {
                            isRun = true;
                            // 一開始屬性 遇到土
                            switch (startPro) {
                                case "木":
                                    tempStartEng--;
                                    break;

                                case "火":
                                    tempStartPro = "土";
                                    break;

                                case "土":
                                    break;

                                case "金":
                                    tempStartEng++;
                                    break;

                                case "水":
                                    tempStartEng--;
                                    break;
                            }
                        }
                        break;

                    case "金":
                        tempGold++;
                        if (tempGold <= this.GoldCount) {
                            isRun = true;
                            // 一開始屬性 遇到金
                            switch (startPro) {
                                case "木":
                                    tempStartEng--;
                                    break;

                                case "火":
                                    tempStartEng--;
                                    break;

                                case "土":
                                    tempStartPro = "金";
                                    break;

                                case "金":
                                    break;

                                case "水":
                                    tempStartEng++;
                                    break;
                            }
                        }
                        break;

                    case "水":
                        tempWater++;
                        if (tempWater <= this.WaterCount) {
                            isRun = true;
                            // 一開始屬性 遇到水
                            switch (startPro) {
                                case "木":
                                    tempStartEng++;
                                    break;

                                case "火":
                                    tempStartEng--;
                                    break;

                                case "土":
                                    tempStartEng--;
                                    break;

                                case "金":
                                    tempStartPro = "水";
                                    break;

                                case 水:
                                    break;
                            }
                        }
                        break;

                }
                if (isRun) {
                    if (tempStartEng != 0 && tempStartEng != 4) {
                        if (this.selectedMiddlePath === 0) {
                            tempProcess.push(this.properitys[i]);
                            this.Go(tempStartPro, tempStartEng, tempWood, tempFire, tempDust, tempGold, tempWood, path, tempProcess);
                        } else {
                            if (path === this.selectedMiddlePath) {
                                if (this.properitys[i] !== this.selectedMiddleProperity) {
                                    tempProcess.push(this.properitys[i]);
                                    this.Go(tempStartPro, tempStartEng, tempWood, tempFire, tempDust, tempGold, tempWood, path, tempProcess);
                                }
                            }
                        }
                    }
                }
            }

        } else if (path == this.PathCount + 1 && this.PathCount !==0) {
            if (startPro == this.selectedEndProperity&& startEng==  this.endEnergy) {
                this.Result.push(process);
                this.ResultCount++;
            }
        }
    }
}