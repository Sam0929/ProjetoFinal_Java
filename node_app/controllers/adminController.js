const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getUsers = (req, res) => {
    User.findAll({ order: [['id', 'ASC']] }).then(users => {
        res.render('./admins/users', {
            users: users.map(user => user.toJSON())
        });
    });
};

exports.form = (req, res) => {
    res.render('./admins/add_users');
};

exports.add = async (req, res) => {
    try {
        // Manualmente define as regras de validação
        await body('name').notEmpty().withMessage('O campo Nome é obrigatório').run(req);
        await body('email').notEmpty().withMessage('O campo Email é obrigatório').run(req);
        await body('password').notEmpty().withMessage('A senha não pode estar vazia!').isLength({ min: 8 }).withMessage('A senha deve ter no mínimo 8 caracteres!').run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Se houver erros de validação, renderize a página do formulário novamente com os erros
            return res.render('./admins/add_users', { errors: errors.array() });
        }

        // Se a validação passar, continue com a lógica de criar o usuário
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        req.flash('success_msg', 'Usuário criado com sucesso!');
        res.redirect('/admin/users');
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Erro ao criar o usuário!');
        res.redirect('/admin/users');
    }
};

exports.edit = (req, res) => {
    User.findOne({ where: { id: req.params.id } })
        .then((user) => {
            if (!user) {
                req.flash('error_msg', 'ID de usuário não encontrado');
                return res.redirect('/admin/users');
            }
            res.render('./admins/edit_users', { user: user });
        })
        .catch((erro) => {
            req.flash('error_msg', 'Erro ao buscar o usuário!');
            res.redirect('/admin/users');
        });
};

exports.update = async (req, res) => {
  try {

      // Manualmente define as regras de validação
      await body('name').notEmpty().withMessage('O campo Nome é obrigatório').run(req);
      await body('email').notEmpty().withMessage('O campo Email é obrigatório').run(req);
      await body('password').notEmpty().withMessage('A senha não pode estar vazia!').isLength({ min: 8 }).withMessage('A senha deve ter no mínimo 8 caracteres!').run(req);

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
          // Se houver erros de validação, renderize a página do formulário novamente com os erros
          return res.render('./admins/edit_users', { errors: errors.array() });
      }

      const user = await User.findOne({ where: { id: req.body.id } });

      if (!user) {
          req.flash('error_msg', 'ID de usuário não encontrado');
          return res.redirect('/admin/users');
      }

      user.name = req.body.name;
      user.email = req.body.email;
      user.password = req.body.password;

      user.save()
          .then(() => {
              req.flash('success_msg', 'Usuário atualizado com sucesso!');
              res.redirect('/admin/users');
          })
          .catch((erro) => {
              req.flash('error_msg', 'Erro ao atualizar o usuário!');
              res.redirect('/admin/users');
          });
  } catch (error) {
      console.error(error);
      req.flash('error_msg', 'Erro ao editar o usuário!');
      res.redirect('/admin/users');
  }
};

exports.delete = (req, res) => {
    User.findOne({ where: { id: req.params.id } })
        .then((user) => {
            if (!user) {
                req.flash('error_msg', 'ID de usuário não encontrado');
                return res.redirect('/admin/users');
            }

            User.destroy({ where: { id: req.params.id } })
                .then(() => {
                    req.flash('success_msg', 'Usuário deletado com sucesso!');
                    res.redirect('/admin/users');
                })
                .catch((erro) => {
                    req.flash('error_msg', 'Erro ao deletar o usuário!');
                    res.redirect('/admin/users');
                });
        })
        .catch((erro) => {
            req.flash('error_msg', 'Erro ao buscar o usuário!');
            res.redirect('/admin/users');
        });
};
