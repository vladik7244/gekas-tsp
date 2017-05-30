/**
 * Created by bruno on 03/05/16.
 */


 var nodes = [
//{name: '1', x: 123, y: 32 },
// {name: '2', x: 123, y: 12},                            
// {name: '3', x: 32, y: 15}    

// {name: '1', x: 6734, y: 1453 },
// {name: '2', x: 123, y: 12},                            
// {name: '3', x: 32, y: 15}  

{name: 1 , x:6734, y: 1453  },
{name: 2 , x:2233, y: 10    },
{name: 3 , x:5530, y: 1424  },
{name: 4 , x:401 , y:841    },
{name: 5 , x:3082, y: 1644  },
{name: 6 , x:7608, y: 4458  },
{name: 7 , x:7573, y: 3716  },
{name: 8 , x:7265, y: 1268  },
{name: 9 , x:6898, y: 1885  },
{name: 10, x: 1112, y: 2049 },
{name: 11, x: 5468, y: 2606 },
{name: 12, x: 5989, y: 2873 },
{name: 13, x: 4706, y: 2674 },
{name: 14, x: 4612, y: 2035 },
{name: 15, x: 6347, y: 2683 },
{name: 16, x: 6107, y: 669  },
{name: 17, x: 7611, y: 5184 },
{name: 18, x: 7462, y: 3590 },
{name: 19, x: 7732, y: 4723 },
{name: 20, x: 5900, y: 3561 },
{name: 21, x: 4483, y: 3369 },
{name: 22, x: 6101, y: 1110 },
{name: 23, x: 5199, y: 2182 },
{name: 24, x: 1633, y: 2809 },
{name: 25, x: 4307, y: 2322 },
{name: 26, x: 675, y: 1006  },
{name: 27, x: 7555, y: 4819 },
{name: 28, x: 7541, y: 3981 },
{name: 29, x: 3177, y: 756  },
{name: 30, x: 7352, y: 4506 },
{name: 31, x: 7545, y: 2801 },
{name: 32, x: 3245, y: 3305 },
{name: 33, x: 6426, y: 3173 },
{name: 34, x: 4608, y: 1198 },
{name: 35, x: 23, y: 2216   },
{name: 36, x: 7248,y: 3779  },
{name: 37, x: 7762,y: 4595  },
{name: 38, x: 7392,y: 2244  },
{name: 39, x: 3484,y: 2829  },
{name: 40, x: 6271,y: 2135  },
{name: 41, x: 4985,y: 140   },
{name: 42, x: 1916,y: 1569  },
{name: 43, x: 7280,y: 4899  },
{name: 44, x: 7509,y: 3239  },
{name: 45, x: 10, y:  2676  },
{name: 46, x: 6807, y: 2993 },
{name: 47, x: 5185, y: 3258 },
{name: 48, x: 3023, y: 1942 }
     // {x: 50, y: 10, name: 'a'},
     // {x: 100, y: 30, name: 'b'},
     // {x: 50, y: 50, name: 'c'},
     // {x: 50, y: 60, name: 'd'},
     // {x: 60, y: 70, name: 'e'},
     // {x: 40, y: 80, name: 'f'},
     // {x: 50, y: 90, name: 'g'},
     // {x: 70, y: 50, name: 'h'},
     // {x: 100, y: 30, name: 'b2'}
	 
	 

     // {x: 160, y: 20, name: 'a'},
     // {x: 60, y: 20, name: 'b'},
     // {x: 20, y: 20, name: 'c'},
     // {x: 200, y: 40, name: 'd'},
     // {x: 100, y: 40, name: 'e'},
     // {x: 20, y: 40, name: 'f'},
     // {x: 180, y: 60, name: 'g'},
     // {x: 120, y: 80, name: 'h'},
     // {x: 60, y: 80, name: 'i'},
     // {x: 180, y: 100, name: 'j'},
     // {x: 100, y: 120, name: 'k'},
     // {x: 40, y: 120, name: 'l'},
     // {x: 140, y: 140, name: 'm'},
     // {x: 200, y: 160, name: 'n'},
     // {x: 100, y: 160, name: 'o'},
     // {x: 20, y: 160, name: 'p'},
     // {x: 140, y: 180, name: 'q'},
     // {x: 80, y: 180, name: 'r'},
     // {x: 180, y: 200, name: 's'},
     // {x: 60, y: 200, name: 't'},
     // {x: 20, y: 160, name: 'u'}

 ];

//var nodes = app.generateRandomDeltaPath(500, 10, 800);

app.drawEdges(nodes, 'cnsIn');

var output = new app.output($('#output'));

var lk = new app.tsp.LinKernighan(nodes);
var finalTour = lk.solve();

output.println("Final Tour: " + finalTour.toString());

app.drawEdges(finalTour.tour, 'cnsOut');


	 function swap(start, end, size, lst){
		for(let i=0;i<size;i++){
            lst.splice(start, 0, lst.remove(end));
		}
	}

