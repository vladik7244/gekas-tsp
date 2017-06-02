/**
 * Created by gekas on 31.05.2017.
 */
//  function printCitiesNameToConsole (cities){
//     let result = "";
//     for(let i = 0; i < cities.length; i++) result += cities[i].name + " ";
//
//     console.log(result);
// }

class ThreeOpt{
     constructor(){
          this.ReconnectionCases  = {
              opt3_case_0 : 0,
              opt3_case_1 : 1,
              opt3_case_2 : 2,
              opt3_case_3 : 3,
              opt3_case_4 : 4,
              opt3_case_5 : 5,
              opt3_case_6 : 6,
              opt3_case_7 : 7
          }
     }

     DoThreeOpt(tour){
        let resultTour = new Tour();
        resultTour.setCities([...tour.path]);
        let tourPath = resultTour.path;

        let locallyOptimal = false;
        let N = tourPath.length;
        let optCases = [this.ReconnectionCases.opt3_case_6, this.ReconnectionCases.opt3_case_7];
        let gainExpected;

        while(!locallyOptimal){
            locallyOptimal = true;

            for(let counter_1 = 0; counter_1 <= N - 1; counter_1++){
                let i = counter_1; // first cut after i

                let X1 = tourPath[i];
                let X2 = tourPath[(i+1) % N];

                for(let counter_2 = 1; counter_2 <= N-3; counter_2++){
                    let j = (i+counter_2) % N; // second cut after j

                    let Y1 = tourPath[j];
                    let Y2 = tourPath[(j+1) % N];

                    for(let counter_3 = counter_2+1; counter_3 <= N-1; counter_3++){
                        let k = (i + counter_3) % N; // third cut after k

                        let Z1 = tourPath[k];
                        let Z2 = tourPath[(k+1) % N];

                        for(let optCaseIdx = 0; optCaseIdx < optCases.length; optCaseIdx++){
                            gainExpected  = this.GainFrom3Opt(X1, X2, Y1, Y2, Z1, Z2, optCases[optCaseIdx]);

                            if(gainExpected > 0){
                                this.Make3OptMove(tourPath, i,j,k,optCases[optCaseIdx]);
                                locallyOptimal = false;
                            }

                            if(!locallyOptimal) break;
                        }
                        if(!locallyOptimal) break;
                    }
                    if(!locallyOptimal) break;
                }
                if(!locallyOptimal) break;
            }
        }

        resultTour.setCities(tourPath)
         return resultTour
     }

     GainFrom3Opt(X1, X2, Y1, Y2, Z1, Z2, optCase){
         let del_Length;
         let add_Length;
         
        if(optCase == this.ReconnectionCases.opt3_case_0){
            return 0;
        }

        // 2-OPT MOVES
        // move equal to a single 2-opt move
        if(optCase == this.ReconnectionCases.opt3_case_1){       // a'bc;  2-opt (i,k)
            del_Length = X1.costTo(X2) + Z1.costTo(Z2);
            add_Length = X1.costTo(Z1) + X2.costTo(Z2);
        }else if(optCase == this.ReconnectionCases.opt3_case_2){ // abc';  2-opt (j,k)
            del_Length = Y1.costTo(Y2) + Z1.costTo(Z2);
            add_Length = Y1.costTo(Z1) + Y2.costTo(Z2);
        }else if(optCase == this.ReconnectionCases.opt3_case_3){ // ab'c;  2-opt (i,j)
            del_Length = X1.costTo(X2) + Y1.costTo(Y2);
            add_Length = X1.costTo(Y1) + X2.costTo(Y2);
        }

        // PURE 3-OPT MOVES
        // NOTE: all 3 edges to be removed, so the same formula for del_Length
        // A) move equal to two subsequent 2-opt moves, asymmetric
        else if(optCase == this.ReconnectionCases.opt3_case_4){ // ab'c'
            del_Length = X1.costTo(X2) + Y1.costTo(Y2) + Z1.costTo(Z2)
            add_Length = X1.costTo(Y1) + X2.costTo(Z1) + Y2.costTo(Z2)
        }else if(optCase == this.ReconnectionCases.opt3_case_5){ // a'b'c
            del_Length = X1.costTo(X2) + Y1.costTo(Y2) + Z1.costTo(Z2)
            add_Length = X1.costTo(Z1) + Y2.costTo(X2) + Y1.costTo(Z2)
        }else if(optCase == this.ReconnectionCases.opt3_case_6){ // a'bc'
            del_Length = X1.costTo(X2) + Y1.costTo(Y2) + Z1.costTo(Z2)
            add_Length = X1.costTo(Y2) + Z1.costTo(Y1) + X2.costTo(Z2)
        }
        // B) move equal to three subsequent 2-opt moves, symmetric
        else if(optCase == this.ReconnectionCases.opt3_case_7){ // a'b'c' (=acb)
            del_Length = X1.costTo(X2) + Y1.costTo(Y2) + Z1.costTo(Z2)
            add_Length = X1.costTo(Y2) + Z1.costTo(X2) + Y1.costTo(Z2)
        }

        let result = del_Length - add_Length;
        return result;
     }

     Make3OptMove(tour,i,j,k,optCase){
         let N = tour.length;

         // 2-OPT MOVES
         // one of the three links is removed and added again
         if(optCase == this.ReconnectionCases.opt3_case_1){       // a'bc;  2-opt (i,k)
             this.ReverseSegment(tour, (k+1)% N, i)
         }else if(optCase == this.ReconnectionCases.opt3_case_2){ // abc';  2-opt (j,k)
             this.ReverseSegment(tour, (j+1)% N, k)
         }else if(optCase == this.ReconnectionCases.opt3_case_3){ // ab'c;  2-opt (i,j)
             this.ReverseSegment(tour, (i+1)% N, j)
         }

         // PURE 3-OPT MOVES
         // all three links are removed, then other links between cities added
         // A) moves equal to two subsequent 2-opt moves, asymmetric:
         else if(optCase == this.ReconnectionCases.opt3_case_4){ // ab'c'
             this.ReverseSegment(tour, (j+1) % N, k)
             this.ReverseSegment(tour, (i+1) % N, j)
         }else if(optCase == this.ReconnectionCases.opt3_case_5){ // a'b'c
             this.ReverseSegment(tour, (k+1) % N, i)
             this.ReverseSegment(tour, (i+1) % N, j)
         }else if(optCase == this.ReconnectionCases.opt3_case_6){ // a'bc'
             this.ReverseSegment(tour, (k+1) % N, i)
             this.ReverseSegment(tour, (j+1) % N, k)
         }
         // B) move equal to three subsequent 2-opt moves, symmetric
         else if(optCase == this.ReconnectionCases.opt3_case_7){ // a'b'c' (=acb)
             this.ReverseSegment(tour, (k+1) % N, i)
             this.ReverseSegment(tour, (i+1) % N, j)
             this.ReverseSegment(tour, (j+1) % N, k)
         }
     }

     ReverseSegment(array, startIndex, endIndex){
         let N = array.length;

         let inversionSize = Math.floor(((N + endIndex - startIndex + 1) % N) / 2)
         let left = startIndex;
         let right = endIndex;

         for(let i = 0; i < inversionSize; i++){
             let leftTmp = array[left];
             array[left] = array[right];
             array[right] = leftTmp;

             left = (left + 1) % N
             right = (N + right - 1) % N
         }
     }
}


// function threeOpt(tour) {
//
//     printCitiesNameToConsole(tour.path)
//
//     let minCost = Number.MAX_VALUE;
//     let shortestPath = [];
//
//     for(let startCityIdx = 0; startCityIdx < tour.path.length; startCityIdx++){
//
//         let i = 0;
//         // printCitiesNameToConsole(tour.path)
//         // for(let i = 0; i < tour.path.length; i++){
//         for(let iL = 2; iL < tour.path.length - 1; iL++){
//
//             //  for(let j = i+iL+1; j < tour.path.length; j++){
//             let j = i+iL;
//             for(let jL = 2; jL <= tour.path.length - iL - 2; jL++){
//                 let fstPart = tour.path.slice(i, i+iL);
//                 let scndPart = tour.path.slice(j, j+jL);
//                 let thirdPart = tour.path.slice(j+jL);
//
//                 let shortestAmongAllSwapsInCurrentSetup = getShortestPathAmongAllSwaps(fstPart, scndPart, thirdPart);
//                 let currentSetupMinCost= Tour.getTourCost(shortestAmongAllSwapsInCurrentSetup)
//             //   let {shortestAmongAllSwapsInCurrentSetup, currentSetupMinCost} = getShortestPathAmongAllSwaps(fstPart, scndPart, thirdPart);
//
//                 if(currentSetupMinCost < minCost){
//                     minCost = currentSetupMinCost;
//                      shortestPath = shortestAmongAllSwapsInCurrentSetup;
//                  }
//                 // printCitiesNameToConsole(fstPart);
//                 // printCitiesNameToConsole(scndPart);
//                 // printCitiesNameToConsole(thirdPart);
//             }
//             // }
//         }
//
//         tour.path = tour.path.concat(tour.path.splice(0,tour.path.length-1));
//         console.log("____")
//
//         return {shortestPath, minCost};
//         //}
//     }
//
//     function getShortestPathAmongAllSwaps(firstPart, secondPart, thirdPart){
//         let minCost = Number.MAX_VALUE;
//         let shortestPath = [];
//
//         for(let reverseFirst = 0; reverseFirst <= 1; reverseFirst++){
//             for(let reverseSecond = 0; reverseSecond <= 1; reverseSecond++) {
//                 for (let reverseThird = 0; reverseThird <= 1; reverseThird++) {
//                     let currentPath = [...(reverseFirst ? firstPart.map(x=>x).reverse() : firstPart),
//                                         ...(reverseSecond ? secondPart.map(x=>x).reverse() : secondPart),
//                                         ...(reverseThird ? thirdPart.map(x=>x).reverse() : thirdPart)];
//
//                     let cost = Tour.getTourCost(currentPath)
//
//                     if(cost<minCost){
//                         minCost = cost;
//                         shortestPath = currentPath;
//                     }
//
//                    // printCitiesNameToConsole(currentPath)
//                   //  console.log(reverseFirst+" " + reverseSecond+" "+reverseThird + " =" + cost);
//                 }
//             }
//         }
//
//         return shortestPath//, minCost};
//     }
//
// }

