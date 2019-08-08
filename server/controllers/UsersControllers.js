import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { users } from '../models/users';
import
{ validateNewUser, validateLoggingUser } from '../helpers/validators/usersValidator';

export default class Users {
  static async signupUser(req, res) {
    const { body } = req;
    const { error } = validateNewUser(body);
    if (error) {
      const status = 400;
      return res.status(status).json({
        status,
        error: error.details[0].message,
      });
    }
    const user = users.find(c => c.email === req.body.email);
    if (user) {
      const status = 400;
      return res.status(status).json({
        status,
        error: 'email already taken',
      });
    }
    const newUser = {
      user_id: users.length + 1,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      is_admin: req.body.is_admin,
    };
    const token = jwt.sign(
      { user_id: newUser.user_id, email: newUser.email, is_admin: newUser.is_admin },
      /* get("jwtPrivateKey") */ 'izzeddin',
    );
    users.push(newUser);
    const status = 201;
    res.status(status).json({
      status,
      data: {
        token,
        user_id: newUser.user_id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
      },
    });
  }

  static async signinUser(req, res) {
    const { body } = req;
    const { error } = validateLoggingUser(body);
    if (error) {
      const status = 400;
      return res.status(status).json({
        status,
        error: error.details[0].message,
      });
    }
    const user = users.find(c => c.email === body.email);
    if (!user) {
      const status = 404;
      return res.status(status).json({
        status,
        error: 'invalid email or password',
      });
    }
    const validPassword = await bcrypt.compare(body.password, user.password);

    if (!validPassword) {
      const status = 400;
      return res.status(status).json({
        status,
        error: 'invalid password or email',
      });
    }

    const token = jwt.sign(
      { user_id: user.user_id, email: user.email, is_admin: user.is_admin },
      /* get("jwtPrivateKey") */ 'izzeddin',
    );
    const status = 200;
    res.status(200).json({
      status,
      data: {
        token,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  }
}
