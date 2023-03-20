const questionOne = function questionOne(arr) {
    // Implement question 1 here
    const myobj = {};
    if (!arr) {
        return {};
    }
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i] * arr[i] - 7;
    }
    for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.abs(arr[i]);
    }
    let isPrime = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == 2) {
            isPrime[i] = true;
        }
        else {
            for (let j = 2; j < arr[i]; j++) {
                if (arr[i] % j == 0) {
                    isPrime[i] = false;
                    break;
                }
                else {
                    isPrime[i] = true;
                }
            }
        }
    }

    for (let i = 0; i < arr.length; i++) {
        myobj[arr[i]] = isPrime[i];
    }
    return myobj;
}

const questionTwo = function questionTwo(arr) {
    // Implement question 2 here\
    if (!arr) {
        return [];
    }
    let unique = arr.filter((item, i, ar) => ar.indexOf(item) === i);
    return unique;
}

const questionThree = function questionThree(arr) {
    // Implement question 3 here
    var organized = {};
    for (let i = 0; i < arr.length; i++) {
        let word = arr[i].split("").sort().join("");
        if (!organized.hasOwnProperty(word)) {
            organized[word] = [];
        }
        organized[word].push(arr[i]);

    }
    for (let key in organized) {
        if (organized[key].length < 2) {
            delete organized[key];
        }
    }

    return organized;
}


const questionFour = function questionFour(num1, num2, num3) {
    // Implement question 4 here

    let arr = [num1, num2, num3];
    let factorial = (x) => {
        if (x == 0) {
            return 1;
        }
        else {
            return x * factorial(x - 1);
        }
    }
    var sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum = sum + factorial(arr[i]);
    }
    let avg = (num1 + num2 + num3) / arr.length;
    sum = sum / avg;
    sum = Math.floor(sum);
    return sum;

}

let pivotIndex = function (nums) {
    let sum = 0;
    let x = 0;
    let sol;
    console.log(nums, "Number Array");
    for (let i = 0; i < nums.length; i++) {
        sum = sum + nums[i];
        console.log(sum, "Sum")
        console.log(i, "Value of i");
        let sum2 = 0;
        for (let j = i + 1; j < nums.length; j++) {
            //console.log(nums[j])
            sum2 = sum2 + nums[j]
            console.log(sum2, "Sum2")
            if (sum == sum2) {
                //console.log(i);
                x++;

                sol = i
            }

        }
    }
    if (x == 1) {
        return sol;
    }
    else
        return -1;


};


let find = function (nums, k) {
    let count = 0;

    let nums1 = [...new Set(nums)];
    //console.log("Inside the function ")
    for (let i in nums1) {
        //console.log("We are inside the loop ")
        for (let j = 1; j < nums1.length; j++) {
            //console.log(Math.abs(nums[i] - nums[j]), "Absolute");
            if (Math.abs(nums[i] - nums[j]) === k) {
                console.log(nums[i], nums[j], "UNique pairs")
                count++;
            }
        }
    }

    return count;

};



let sd = function (points, line) {
    let arr = [];
    let a = line[0];
    let b = line[1];
    let c = line[2];
    console.log(a, b, c)
    for (let i = 0; i < points; i++) {
        for (let j = 0; j < points.length; j++) {
            let num = points[i][j];
            let x1 = num[0]
            let y1 = num[1];
            let d = Math.abs((
                (a * x1 + b * y1 + c)) / (Math.sqrt(a * a + b * b)));
            d = d.toFixed(11);
            arr.push(d);
        }


    }
    console.log(arr);
    let x;
    let smallest = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < smallest) {
            smallest = arr[i];
            x = i;
        }
    }

    return points[0][x - 1];
}

// Driver code

console.log(sd([[1, 2], [5, 6], [7, 2], [2, 7], [4, 8]], [1, -1, 2]), "Answer");




module.exports = {
    firstName: "Muzaffarhusain",
    lastName: "Turak",
    studentId: "10476985",
    questionOne,
    questionTwo,
    questionThree,
    questionFour,
    pivotIndex,
    find,
    sd,
};


/*
[[1,3],
[1,3],
[3,5]]
*/
