
let Main = {
    distances: [],
}

class TSPSolvers {
    find() {
        throw new Error('Not implemented find method')
    }

    /**
     * Computes total length of the given path
     * @param lst The Path
     * @param add If it is true, add first city to the front and behind of the path,otherwise does not.
     * @return Total Length of the Path
     */
    static computeTotalCost(lst, add) {
        if (add) {
            lst = [0, ...lst, 0]
        }
        let cost = 0;
        for (let i = 0; i < lst.length - 1; i++) {
            cost += Main.distances[lst[i]][lst[i + 1]];
        }
        return cost;
    }

    static printPretty(myList, type, n) {
        console.log('not implemented')
        // BufferedWriter wr = new BufferedWriter(new FileWriter(type+"_tsp_"+n+".txt",true));
        // wr.write(""+computeTotalCost(myList, false)+"\n");
        // wr.write(""+(myList.removeFirst()+1));
        // for(Integer i:myList)
        // wr.write("-"+(i+1));
        // wr.write("\n");
        // wr.close();
        // myList.addFirst(new Integer(0));
    }
}

class OptSolvers extends TSPSolvers {
    /**
     * Specify this object as either 2opt or 3opt.
     * If it is true this is 2opt, otherwise 3opt.
     */
    isOpt2;
    /**
     * Holds result of randomPath(bestPath)
     */
    bestResult;
    /**
     * Holds current path that is analyzed and that is currently the best path
     */
    randomPath;
    /**
     * Number of Cities
     */
    n;

    /**
     * Constructs a 2opt or 3opt solver
     * @param n Number of cities
     * @param isOpt2 If it is true,this is 2Opt, otherwise 3Opt
     * @param distances Distance array
     */
    constructor(n, isOpt2) {//true:2Opt   false:3Opt
        super();
        this.n = n;
        this.isOpt2 = isOpt2;

        this.randomPath = [];

        for (let i = 1; i < n; i++) {
            let randomCity = getRandomInt(1, n)
            while (this.randomPath.contains(randomCity))
                randomCity = getRandomInt(1, n)
            this.randomPath.push(randomCity);
        }
        this.randomPath = [0, ...this.randomPath, 0]
        this.bestResult = TSPSolvers.computeTotalCost(this.randomPath, false);
    }

    /**
     * Implements required method to be a TSPSolvers
     */
    find() {//true:2Opt   false:3Opt
        let timesNoModif = 0;
        let cur = [];
        while (timesNoModif < 50) {
            cur = [...this.randomPath]
            if (this.isOpt2)
                cur = this.newSolution2(cur);
            else
                cur = this.newSolution3(cur);
            let res = TSPSolvers.computeTotalCost(cur, false);
            if (res < this.bestResult) {
                this.bestResult = res;
                this.randomPath = [...cur];
                timesNoModif = 0;
            } else
                timesNoModif++;
        }
        if (this.isOpt2)
            TSPSolvers.printPretty(this.randomPath, "2opt", this.n);
        else
            TSPSolvers.printPretty(this.randomPath, "3opt", this.n);

    }

    /**
     * Creates a valid random new solution for 2Opt method
     * @return
     */
    newSolution2(cur) {
        let bounds = this.generateBigSmall(3);
        return this.reverse(bounds[0] + 1, bounds[1] - bounds[0] - 1, cur);
    }

    /**
     * Try all possible four case with randomly selected edges for 3Opt
     * and selects best one as a new solution
     * @return
     */
    newSolution3(cur) {
        let bond = this.generateBigSmall(5);
        let block1Size = getRandomInt(2, bond[1] - bond[0] - 2) // r.nextInt(bond[1]-bond[0]-4)+2; TODO warning!
        let block2Size = bond[1] - bond[0] - 1 - block1Size;
        let currentOne = [...cur]
        let bestOfFour = [...cur]
        let bestVal = Number.MAX_VALUE;
        for (let i = 0; i < 4; i++) {
            switch (i) {
                case 0:
                    this.swap(bond[0] + 1, bond[1] - 1, block2Size, currentOne); //no need to create currentOne for this case
                    break;
                case 1:
                    currentOne = [...cur]//reset currentOne
                    this.swap(bond[0] + 1, bond[1] - 1, block2Size, currentOne);
                    currentOne = this.reverse(bond[0] + 1, block2Size, currentOne);
                    break;
                case 2:
                    currentOne = [...cur];//reset currentOne
                    this.swap(bond[0] + 1, bond[1] - 1, block2Size, currentOne);
                    currentOne = this.reverse(bond[0] + 1 + block2Size, block1Size, currentOne);
                    break;
                case 3:
                    currentOne = [...cur];//reset currentOne
                    currentOne = this.reverse(bond[0] + 1, block1Size, currentOne);
                    currentOne = this.reverse(bond[0] + 1 + block1Size, block2Size, currentOne);
                    break;
            }
            let tempRes = TSPSolvers.computeTotalCost(currentOne, false);
            if (tempRes < bestVal) {
                bestVal = tempRes;
                bestOfFour = [...currentOne];
            }
        }
        return bestOfFour;
    }

    /**
     * Reverse given list part
     * @param start start place of the list that will be reversed
     * @param size size of the block that will be reversed
     * @param lst list that contains this block
     */
    reverse(start, size, lst) {
        let big = start + size;
        return [
            ...lst.slice(0, start - 1),
            ...lst.slice(start - 1 , big).reverse(),
            ...lst.slice(big),
        ]
    }

    /**
     * Swaps place of two blocks within list
     * @param start start of first block
     * @param end end of second block
     * @param size size of second block
     * @param lst list contains this blocks
     */
    swap(start, end, size, lst) {
        for (let i = 0; i < size; i++) {
            lst.add(start, lst.remove(end));
        }
    }

    /**
     * Generates one big and one small number that determines size of block that will change
     * @param aperture Determines minimum block size between this two number,different for 2opt and 3opt
     * @return int[] array that contains big number in indice 1 and small number in indice 0
     */
    generateBigSmall(aperture) {
        let values = [];
        let n1 = getRandomInt(0, this.n);
        let n2 = getRandomInt(0, this.n);
        while (Math.abs(n2 - n1) < aperture || Math.abs(n2 - n1) === this.n) {
            n2 = getRandomInt(0, this.n);
            n1 = getRandomInt(0, this.n);
        }
        values[0] = Math.min(n1, n2);
        values[1] = Math.max(n1, n2);
        return values;
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}