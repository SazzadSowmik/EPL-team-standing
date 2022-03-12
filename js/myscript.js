const URL = "https://api-football-standings.azharimm.site/leagues/eng.1/standings?season=2021&sort=asc";

let app = angular.module("Football-Standing", [])

app.controller('MyCntrl', ($scope, $http)=>{
    $scope.title = "EPL Team Status!!!";

    

    $scope.get_team_data = () => {
        let inputTeam = $scope.tm;
        if (inputTeam == ""){
            return;
        }


        $http.get(URL).then(
            (response)=>{
                //console.log(response.data["data"]["standings"])
                $scope.all_data = response.data;
                for (let i=0;i<20;i++){
                    let teamName = response.data["data"]["standings"][i]["team"].name;
                    //console.log(teamName);
                    //console.log($scope.inputTeam);
                    if (inputTeam == teamName){
                        $scope.win = response.data["data"]["standings"][i]["stats"][0].displayValue;
                        $scope.lose = response.data["data"]["standings"][i]["stats"][1].displayValue;
                        $scope.draw = response.data["data"]["standings"][i]["stats"][2].displayValue;
                    }
                }
            },
            (error)=>{
                console.log(error);
            }
        );
    }; 
    $scope.teams = [];

    $http.get(URL).then(
        (response)=>{
            $scope.all_data = response.data;
            for (let i=0;i<20;i++){
                $scope.teams[i] = response.data["data"]["standings"][i]["team"].name;
            }
        },
        (error)=>{
            console.log(error);
        }
    );
    

    console.log($scope.teams);
    


});