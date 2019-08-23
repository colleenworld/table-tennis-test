var app = angular.module("scoreboard", [])

app.filter('Winners', function () {
    return function (items) {
        var result = []
        var k = -1
        var filtered = []

        for (let i = 0; i < items.length; i++) {
            let item = items[i]
            if (item.score_1 > item.score_2) {
                filtered.push({name: item.player_1, points: 2})
                filtered.push({name: item.player_2, points: 0})
            }
            else {
                filtered.push({name: item.player_2, points: 2})
                filtered.push({name: item.player_1, points: 0})
            }
        }
        filtered.sort((a, b) => (a.name > b.name) ? 1 : -1)
        for (let i = 0; i < filtered.length; i++) {
            if (result[k] && result[k].name === filtered[i].name) {
                if (filtered[i].name === 'Steve (CEO)') result[k].points = 0
                else result[k].points += filtered[i].points
            }
            else {
                result.push(filtered[i])
                k++
            }
        }
        result.sort((a, b) => (a.points < b.points) ? 1 : -1)
        return result
    }
})

app.controller("scoreboardController", ['$scope', '$filter',

function($scope, $filter) {

    $scope.players = [
        { id: 1, name: "Justin" },
        { id: 2, name: "Liam" },
        { id: 3, name: "Steve (CEO)" },
        { id: 4, name: "Dan" },
        { id: 5, name: "Lee" },
        { id: 6, name: "Gavin" },
        { id: 7, name: "Tracey" },
        { id: 8, name: "David" },
        { id: 9, name: "Sam" },
        { id: 10, name: "Chris" },
        { id: 11, name: "Joe" },
        { id: 12, name: "Emma" }
    ]

    $scope.results = [
        { id: 1, player_1: "Justin", score_1: 11, player_2: "Steve (CEO)", score_2: 6},
        { id: 2, player_1: "Steve (CEO)", score_1: 13, player_2: "Dan", score_2: 11},
        { id: 3, player_1: "Liam", score_1: 6, player_2: "Lee", score_2: 11},
        { id: 4, player_1: "Liam", score_1: 11, player_2: "Steve (CEO)", score_2: 9},
        { id: 5, player_1: "Justin", score_1: 14, player_2: "Lee", score_2: 12},
        { id: 6, player_1: "Justin", score_1: 10, player_2: "Dan", score_2: 12},
        { id: 7, player_1: "Dan", score_1: 11, player_2: "Lee", score_2: 9},
        { id: 8, player_1: "Justin", score_1: 11, player_2: "Liam", score_2: 3},
        { id: 9, player_1: "Tracey", score_1: 11, player_2: "Emma", score_2: 8},
        { id: 10, player_1: "Emma", score_1: 11, player_2: "Dan", score_2: 9}
    ]

    $scope.league = $filter('Winners')($scope.results)

    $scope.addResult = function(result) {
        if ((result.score_1 < 11 && result.score_2 < 11) && (abs(result.score_1 - result.score_2) >= 2)) {
        result.id = $scope.results.length + 1
        $scope.results.push(result)
        $scope.result = {}
        }
        else alert ("That doesn't look like a proper score. Check the rules again.")
    }

    $scope.addPlayer = function(player) {
        if (($filter('filter')($scope.players, player)).length >= 1) {
            alert("There is already a player called " + player + ". Try again")
        }
        else {
            let id = $scope.largest($scope.players, 'id') + 1
            $scope.players.push({ id: id, name: player })
            alert("New player " + player + " added.")
        }
    }

    $scope.largest = function(myArray, key) {
        let maxId = myArray.reduce(
            (max, item) => (item[key] > max ? item[key] : max), myArray[0].id)
    }

}])


