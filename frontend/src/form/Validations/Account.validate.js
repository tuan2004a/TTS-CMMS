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

    if (!formData.phone || formData.phone.trim() === '') {
        return {
            name: "phone",
            message: "Vui lòng nhập số điện thoại"
        };
    }
    return null; // ✅ Không có lỗi
};
