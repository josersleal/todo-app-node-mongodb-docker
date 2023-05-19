exports.createTodo = function (req, res) {
  if (!req.body.description) {
    return res.status(400).json({
      message: 'Please provide a description',
    });
  }

  // Create
  const todo = new Todo({
    description: req.body.description,
    name: req.body.name || 'Untited todo',
  });

  // SAve
  todo
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || 'some errro happened' });
    });
};

exports.getTodos = (req, res) => {
  Todo.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'some errro happened',
      });
    });
};

exports.getTodo = (req, res) => {
  Todo.findById(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: 'Todo not found' });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({ message: 'Todo not found' });
      }
      res.status(500).send({ message: 'some errro happened' });
    });
};

exports.updateTodo = (req, res) => {
  if (!req.body.description) {
    return res.status(400).send({
      message: 'Please provide a description',
    });
  }

  Todo.findByIdAndUpdate(
    req.params.id,
    {
      description: req.body.description,
      title: req.body.name || 'untited todo',
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: 'Todo not found' });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({ message: 'Todo not found' });
      }
      res.status(500).send({ message: 'some error happened' });
    });
};

exports.deleteTodo = (req, res) => {
  Todo.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: 'Todo not found',
        });
      }
      res.send({ message: 'Todo deleted' });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({ message: 'Todo not found' });
      }
      res.status(500).send({ message: 'some error happened' });
    });
};
