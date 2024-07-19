export const policeStationValidator = (string) => {
    if(string != null){
        const stringArray = string?.toLowerCase().split(" ");
        const idx1 = stringArray.indexOf("police");
        const idx2 = stringArray.indexOf("station");
        if(idx1 > -1 && idx2 > -1) {
            stringArray.splice(idx1,1);
            stringArray.splice(idx2,1);
            return stringArray.length > 0 ? true : false;
        }
        return false;
    }
    return false;
}
export const HospitalValidator = (string) => {
    const stringArray = string?.toLowerCase().split(" ");
    const idx1 = stringArray.indexOf("hospital");
    if(idx1 > -1) {
        stringArray.splice(idx1,1);
        return stringArray.length > 0 ? true : false;
    }
    return false;
}