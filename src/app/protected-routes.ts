export function protectRoutes () {
    return {
        admin: [
            '/dashboard',
            '/dashboard/users',
            '/dashboard/comments',
            '/dashboard/categories',
            '/dashboard/logs',
            '/dashboard/logs/report',
            '/dashboard/logs/user',
            '/dashboard/logs/admin',
            '/dashboard/logs/search',
            '/dashboard/logs/api',
            '/dashboard/logs/admin-activity',
            '/dashboard/logs/admin-activity/search',
            '/dashboard/logs/admin-activity/edit',
            '/dashboard/logs/admin-activity/delete',
            '/dashboard/logs/admin-activity/restore',
            '/dashboard/logs/admin-activity/export',
            '/dashboard/logs/admin-activity/filter',
        ],
        user: [
            "/profiles",
        ]
    }
}

export const checkProtectedRoutes = (url: string, userRole: keyof ReturnType<typeof protectRoutes>) => {
    const protectedRoutes = protectRoutes();
    if(protectedRoutes[userRole]) {
        return protectedRoutes[userRole].includes(url);
    }
    return false;
}