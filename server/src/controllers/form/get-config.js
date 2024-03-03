import formConfig from "../../data/form-config.json" assert { type: "json" };

export default async (req, res) => {
  try {
    res.status(200).json(formConfig);
  } catch (error) {
    return res.status(400).send(error.errors);
  }
};
