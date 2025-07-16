export const AccountValidate = (formData) => {
    if (!formData.code || formData.code.trim() === '') {
        return {
            name: "code",
            message: "Vui lòng nhập mã nhân viên"
        };
    }
    if (!formData.name || formData.name.trim() === '') {
        return {
            name: "name",
            message: "Vui lòng nhập tên"
        };
    }

    if (!formData.email || formData.email.trim() === '') {
        return {
            name: "email",
            message: "Vui lòng nhập email"
        };
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(formData.email)) {
        return {
            name: "email",
            message: "Email phải là địa chỉ Gmail hợp lệ (example@gmail.com)"
        };
    }

    if (!formData.phone || formData.phone.trim() === '') {
        return {
            name: "phone",
            message: "Vui lòng nhập số điện thoại"
        };
    }

    if (!/^\d+$/.test(formData.phone)) {
        return {
            name: "phone",
            message: "Số điện thoại phải là số"
        };
    }

    if (formData.phone.length < 10 || formData.phone.length > 11) {
        return {
            name: "phone",
            message: "Số điện thoại phải có 10 hoặc 11 số"
        };
    }

    if (!formData.password || formData.password.trim() === '') {
        return {
            name: "password",
            message: "Vui lòng nhập mật khẩu"
        };
    }

    if (formData.password.length < 6) {
        return {
            name: "password",
            message: "Mật khẩu phải có ít nhất 6 ký tự"
        };
    }

    if (!formData.role || formData.role.trim() === '') {
        return {
            name: "role",
            message: "Vui lòng chọn vai trò"
        };
    }

    if (!formData.department || formData.department.trim() === '') {
        return {
            name: "department",
            message: "Vui lòng nhập bộ phận"
        };
    }

    return null;
};
