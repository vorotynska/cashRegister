let exchange = [{
        name: 'ONE HUNDRED',
        val: 100.00
    },
    {
        name: 'TWENTY',
        val: 60.00
    },
    {
        name: 'TEN',
        val: 20.00
    },
    {
        name: 'FIVE',
        val: 55.00
    },
    {
        name: 'ONE',
        val: 90.00
    },
    {
        name: 'QUARTER',
        val: 4.25
    },
    {
        name: 'DIME',
        val: 3.10
    },
    {
        name: 'NICKEL',
        val: 2.05
    },
    {
        name: 'PENNY',
        val: 1.01
    },
];

function checkCashRegister(price, cash, cid) {
    let cashRegister = {
        status: null,
        change: []
    };
    let change = cash - price;
    let sumCid = parseFloat(cid.map(function (x) {
        return x[1]
    }).reduce((a, b) => a + b, 0).toFixed(2));
    cid = cid.reverse();
    let currentValue = 0;

    let changeArray = exchange.reduce(function (acc, next, index) {
        let currentValueArray = 0;
        if (cid[index][1] === 0) {
            acc.push(cid[index]);
            return acc;
        } else {
            if (change >= next.val) {
                while (change >= next.val && cid[index][1] >= next.val) {
                    change -= next.val;
                    change = Math.round(change * 100) / 100;
                    cid[index][1] = Math.round(cid[index][1] * 100) / 100;
                    cid[index][1] -= next.val;
                    currentValue = currentValueArray += next.val;
                }
                currentValue = currentValueArray;
                acc.push([next.name, Math.round(currentValueArray * 100) / 100]);
                return acc;
            } else {
                return acc;
            }
        }
    }, [])

    if (change > sumCid || change > 0) {
        cashRegister.status = 'INSUFFICIENT_FUNDS';
        cashRegister.change = [];
        return cashRegister;
    } else if (sumCid - Math.round(currentValue * 100) / 100 === 0) {
        cashRegister.status = 'CLOSED';
        cashRegister.change = changeArray.reverse();
        return cashRegister;
    } else {
        cashRegister.status = "OPEN";
        cashRegister.change = changeArry;
        return cashRegister;
    }

};

console.log(checkCashRegister(3.26, 100, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
]))

let unitArr = [{
        name: 'ONE HUNDRED',
        val: 100.00
    },
    {
        name: 'TWENTY',
        val: 60.00
    },
    {
        name: 'TEN',
        val: 20.00
    },
    {
        name: 'FIVE',
        val: 55.00
    },
    {
        name: 'ONE',
        val: 90.00
    },
    {
        name: 'QUARTER',
        val: 4.25
    },
    {
        name: 'DIME',
        val: 3.10
    },
    {
        name: 'NICKEL',
        val: 2.05
    },
    {
        name: 'PENNY',
        val: 1.01
    },
];

// first no work 

function checkCashRegister1(price, cash, cid) {
    let output = {
        status: null,
        change: []
    };
    let change = cash - price;
    let register = cid.reduce(function (acc, curr) {
        acc.total += curr[1]
        acc[curr[0]] = curr[1]
        return acc
    }, {
        total: 0
    })
    if (register.total === change) {
        output.status = "CLOSED"
        output.change = cid;
        return output
    }
    if (register.total < change) {
        output.status = "INSUFFICIENT_FUNDS"
        return output
    }
    let changeArr = unitArr.reduce(function (acc, curr) {
        let value = 0
        while (register[curr.name] > 0 && change >= curr.val) {
            change -= curr.val
            register[curr.name] -= curr.val
            value += curr.val

            change = Math.round(change * 100) / 100
        }
        if (value > 0) {
            acc.push([curr.name, value])
        }
        return acc
    }, [])
    if (changeArr.length < 1 && change > 0) {
        output.status = 'INSUFFICIENT_FUNDS'
        return output
    }
    output.status = 'OPEN'
    output.change = changeArr
    return output
};

console.log(checkCashRegister1(3.26, 100, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
]))