import Actividad from "../models/activities.model.js";

export const getActivities = async (req, res) => {
  const activities = await Actividad.find({
    creado_por: req.user.id, //el usuario p causa gaaaaaa
  }).populate("creado_por");
  console.log(activities);
  res.json(activities);
};

export const createActivities = async (req, res) => {
  const { titulo, descripcion, fecha, tipo, visibilidad, completado } =
    req.body;
  const newActividad = new Actividad({
    titulo,
    descripcion,
    fecha,
    tipo,
    visibilidad,
    completado,
    creado_por: req.user.id,
  });
  const savedActividad = await newActividad.save();
  res.json(savedActividad);
};

export const getActivitie = async (req, res) => {
  const actividad = await Actividad.findById(req.params.id);
  if (!actividad)
    return res.status(404).json({ message: "Actividad not found" });
  res.json(actividad);
};

export const updateActivities = async (req, res) => {
  const actividad = await Actividad.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!actividad)
    return res.status(404).json({ message: "Actividad not found" });
  res.json(actividad);
};

export const deleteActivities = async (req, res) => {
  const actividad = await Actividad.findByIdAndDelete(req.params.id);
  if (!actividad)
    return res.status(404).json({ message: "Actividad not found" });
  res.status(204);
};
