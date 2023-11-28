const correctTermsMap = new Map([
    ["categories", true],
    ["orders", true],
    ["customers", true],
    ["employees", true],
    ["products", true],
    ["regions", true],
    ["suppliers", true],
    ["shippers", true],
    ["territories", true],
    ["order_details", true],
    ["employee_territories", true],
  ]);

export const isCodeValid = (code)=>{
    const lowerCaseCode=code.toLowerCase();
    const words=lowerCaseCode.split(' ');
    for(const word of words){
        if(correctTermsMap.has(word))return true;
    }
    return false;
};
