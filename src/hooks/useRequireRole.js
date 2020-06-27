const { useCallback } = require('react');
const { useStore } = require('.');

function useRequireRole() {
	const { user } = useStore();
    
    const requireRole = (roles = []) => {
        if(!user || !user.role) return false
        if(roles.length === 0) return true
        return roles.includes(user.role.name)
    }

	return useCallback(requireRole, [user])
}

export default useRequireRole