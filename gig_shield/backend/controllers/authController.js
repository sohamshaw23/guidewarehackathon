const AuthService = require('../services/authService');

class AuthController {
  static async register(req, res) {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async login(req, res) {
    try {
      const { phone, password } = req.body;
      const result = await AuthService.login(phone, password);
      res.status(200).json(result);
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  }

  static async getProfile(req, res) {
    try {
        const user = await AuthService.getProfile(req.user.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  }
}

module.exports = AuthController;
