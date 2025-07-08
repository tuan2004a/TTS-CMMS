export const shiftValidate = (formData) =>{
    if(formData.shift === ''){
        return({
            name: "shift",
            message: "Vui lòng nhập tên ca làm việc"
        })
    }
    
    if(formData.time === ''){
        return({
            name: "time",
            message: "Vui lòng nhập thời gian"
        })
    }
}