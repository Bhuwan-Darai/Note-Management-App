// @desc    Add a new user
// @route   POST /api/users
// @access  Public

import expressAsyncHandler from "express-async-handler";
import prisma from "../prisma";

const addUser = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email } = req.body;

  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
    },
  });

  if (!user) {
    res.json({
      error: "User not created",
    });
  }

  res.json({
    message: "User created successfully",
  });
});

export { addUser };
