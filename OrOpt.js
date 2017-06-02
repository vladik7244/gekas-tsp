/**
 * Created by gekas on 02.06.2017.
 */

class OrOpt{

    // Optimizes the given tour using Or-opt
    // Shortens the tour by repeating Segment Shift moves for segment
    // length equal 3, 2, 1 until no improvement can by done: in every
    // iteration immediatelly makes permanent the first move found that
    // gives any length gain.
    DoOrOpt(tour){
        let resultTour = new Tour();
        resultTour.setCities([...tour.path]);
        let tourPath = resultTour.path;
        let N = tourPath.length;

        let locallyOptimal = false;

        while(!locallyOptimal){
            locallyOptimal = true;

            for(let segmentLen = 3; segmentLen >= 1; segmentLen--){
                for(let pos = 0; pos<=N-1; pos++){
                    let i = pos;
                    let X1 = tourPath[i];
                    let X2 = tourPath[(i + 1) % N];

                    let j = (i + segmentLen) % N;
                    let Y1 = tourPath[j];
                    let Y2 = tourPath[(j + 1) % N];

                    for(let shift = segmentLen + 1; shift <= N - 1; shift++){
                        let k = (i + shift) % N;
                        let Z1 = tourPath[k];
                        let Z2 = tourPath[(k + 1) % N];

                        let gain = this.GainFromSegmentShift(X1, X2, Y1, Y2, Z1, Z2);
                        if(gain > 0){
                            this.MakeSegmentShiftMove(tourPath, i, j, k);
                            locallyOptimal = false;

                            break;
                        }
                    }

                    if(!locallyOptimal) break;
                }
            }
        }

        return resultTour;
    }

    GainFromSegmentShift(X1, X2, Y1, Y2, Z1, Z2){
        let del_length = X1.costTo(X2)+Y1.costTo(Y2)+Z1.costTo(Z2);
        let add_length = X1.costTo(Y2) + Z1.costTo(X2)+Y1.costTo(Z2);

        let result = del_length - add_length;

        return result;
    }

    MakeSegmentShiftMove(tour,i,j,k){
        this.ShiftSegment(tour,i,j,k)
    }

    // Shifts the segment of tour:
    // cities from t[i+1] to t[j] from their current position to position
    // after current city t[k], that is between cities t[k] and t[k+1].
    // Assumes:  k, k+1 are not within the segment [i+1..j]
    ShiftSegment(tourPath,i,j,k){
        let N = tourPath.length;
        let segmentSize = (j-i+N)%N;

        let segmentCopy = tourPath.splice(i+1, segmentSize);

        let idxToPaste;
        if(i > k)  idxToPaste = k+1;
        else idxToPaste = k-segmentSize+1;

        tourPath.splice.apply(tourPath, [idxToPaste,0].concat(segmentCopy));
    }
}