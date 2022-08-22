let Oprators = [">","<" , "==" , ">=" , "<=" , "!=" , "===" , "!==" , "+","-","/","*","**" ,"=","+=" , "-=" , "++","--","/=","*="]



function getcode(){
    let code = document.querySelector("#code").value
    code = code.split("\n")
    let getStatement = breakIntoTheStatement(code)
    console.log(getStatement)

}


function breakIntoTheStatement(code){
    let unitCal = []
    for(let i = 0 ; i < code.length ; i++){
        if(code[i].includes("{")){
            let j = i
            let statement = []
            while(!code[j].includes("}")){
                statement.push(code[j])
                j++;
            }
            i = j

            //get each statment code
            let getUnit = getTheCode(statement)

            //each statement code find units
            unitCal.push(getMaxValue(getUnit))


        }
    }

    //combine all block code
    let allUnits = getthecombineunit(unitCal)

    //get final equations
    let BigO = finalequation(allUnits)
    return BigO

}

function finalequation(allUnits){
    let i = 0
    let final = ""
    while(i < allUnits.length){
        final += allUnits[i]
        if(allUnits[i+1] > 1){
            final += "^" + allUnits[i+1]

        }
        if(["*","+"].includes(allUnits[i])){
            i+=1
        }else{
            i+=2
        }

    }
    if(final == "") final = 1
    return "O(" + final + ")"
}


function getthecombineunit(arr){
    let TotalUnits = []
    for(let i=0;i<arr.length ; i++){
        let temp = arr[i]
        for(let key in temp){
            if(TotalUnits.includes(key)){
                index = TotalUnits.indexOf(key) + 1
                if(TotalUnits[index] < temp[key]){
                    TotalUnits[index] = temp[key]
                }

            }else if(isNaN(key)){
                TotalUnits.push(key)
                TotalUnits.push(temp[key])
                TotalUnits.push("*")
            }
        }
        TotalUnits.pop()
        if(i != arr.length-1){
            TotalUnits.push("+")
        }

    }
    return TotalUnits
}


function getMaxValue(arr){
    let  obj = {}
    for(let i = 0 ; i < arr.length ; i++){
        if(arr[i] in obj){
            obj[arr[i]]++
        }else{
            obj[arr[i]] = 1
        }
    }
    return obj
}



function getTheCode(code){
    //for checking arithmeticOp
    let ans = []
    for(let i = 0 ; i < code.length;i++){

        //check Oprators for each statment
        let countOprators = checkOp(code[i])
        ans.push(countOprators)

        //checkfor FOR loop
        if(code[i].includes("for") || code[i].includes("while")){

            //check for charcter Like "N"
            let start = checkChar(code[i])
            let end = code[i].lastIndexOf(";")
            let res = code[i].slice(start, end).trim()
            if(res){
                ans.push(res)
            }



        }


    }
    return ans
}


function checkChar(str){

    if(str.includes("length")){
        return "N"
    }else{

        for(let i = 0 ; i < str.length ; i++){
            if([">","<",">=","<="].includes(str[i])){
                return i+1
            }
        }

    }

}



function checkOp(str){
    c = 0
    for(let i = 0 ; i < Oprators.length ; i++){
        if(str.includes(Oprators[i])){
            c += 1
        }
    }
    return c
}


