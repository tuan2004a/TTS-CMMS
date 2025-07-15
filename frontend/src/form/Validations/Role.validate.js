export const roleValidate = (data) => {
    if (!data.name || data.name.trim() === '') {
        return { name: 'name', message: 'Tên vai trò không được để trống' };
    }
    return null;
};
