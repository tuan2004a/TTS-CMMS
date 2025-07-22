export const WorkValidate = (formData) =>{
    if(formData.name === ''){
        return({
            name: "name",
            message: "Vui lòng chọn nhân viên"
        })
    }
    
    if(formData.shift === ''){
        return({
            name: "shift",
            message: "Vui lòng chọn ca làm việc"
        })
    }
    if(formData.machines === ''){
        return({
            name: "machines",
            message: "Vui lòng chọn máy sản xuất"
        })
    }
    if(formData.factory === ''){
        return({
            name: "factory",
            message: "Vui lòng chọn xưởng làm việc"
        })
    }
    if(formData.dayTime === ''){
        return({
            name: "dayTime",
            message: "Vui lòng chọn thời gian giờ làm việc"
        })
    }
}