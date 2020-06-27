const messagedStatus = {
    error: 'error',
    success: 'success',
    info: 'info',
    warn: 'warn',
    warning: 'warning',
    loading: 'loading'
}

const roles = {
    admin: 'admin',
    student: 'student',
    teacher: 'teacher',
}

roles.values = function() {
    const values = Object.values(roles)
    values.pop()
    return values
}



export {messagedStatus, roles}