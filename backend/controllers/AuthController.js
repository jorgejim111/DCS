const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthController = {
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      // Busca el usuario por username
      const user = await UserModel.findByUsername(username);
      console.log('Usuario encontrado:', user); // Depuración
      if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });
      // Verifica la contraseña
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' });
      // Genera el token, asegurando que el campo 'role' sea el nombre del rol
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
      console.log('Generando token con:', { id: user.id, role: user.role });
    // Responde con el token y el rol
    res.json({ token, role: user.role });
    } catch (err) {
      res.status(500).json({ error: 'Error en el servidor' });
    }
  }
};

module.exports = AuthController;
