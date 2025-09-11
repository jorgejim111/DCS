// Middleware para verificar el rol del usuario
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
  const userRole = req.user && req.user.role;
  console.log('Rol recibido en middleware:', userRole);
    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Access denied: insufficient permissions' });
    }
    next();
  };
}

module.exports = authorizeRoles;
