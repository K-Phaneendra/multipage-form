export default async (req, res) => {
  try {
    const formData = req.body;
    res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).send(error.errors);
  }
};
