// Pembicara
const Pelanggan = require('../../api/v1/pelanggan/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const createPelanggan = async (req, res) => {
  const { name, email, tarifID, alamat, avatar, no_telp, role } = req.body;

  if (!name || !email || !tarifID || !alamat) {
    throw new BadRequestError('Data harus diisi');
  }

  const result = await Pelanggan.create({
    name,
    email,
    tarifID,
    alamat,
    avatar,
    no_telp,
    role,
  });

  return result;
};

const getAllPelanggan = async (req) => {
  const { keyword, tarifID } = req.query;
  let condition = {};

  if (keyword) {
    condition = { ...condition, title: { $regex: keyword, $options: 'i' } };
  }

  if (tarifID) {
    condition = { ...condition, tarifID: tarifID };
  }

  const result = await Pelanggan.find(condition).populate({
    path: 'tarifID',
    select: '_id id_tarif harga_tarif daya_listrik',
  });

  return result;
};

const getOnePelanggan = async (req) => {
  const { id } = req.params;

  const result = await Pelanggan.findOne({ _id: id }).populate({
    path: 'tarifID',
    select: '_id id_tarif harga_tarif daya_listrik',
  });

  if (!result)
    throw new NotFoundError(`Tidak ada pelanggan dengan id :  ${id}`);

  return result;
};

const updatePelanggan = async (req) => {
  const { id } = req.params;
  const { name, email, tarifID, alamat, no_telp } = req.body;

  const check = await Pelanggan.findOne({
    name,
    email,
    tarifID,
    alamat,
    no_telp,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError('Pelanggan sudah terdaftar');

  const result = await Pelanggan.findOneAndUpdate(
    { _id: id },
    { name, email, tarifID, alamat, no_telp },
    { new: true, runValidators: true }
  );

  if (!result)
    throw new NotFoundError(`Tidak ada pelanggan dengan id :  ${id}`);

  return result;
};

const deletePelanggan = async (req) => {
  const { id } = req.params;

  const result = await Pelanggan.findOne({ _id: id });

  if (!result)
    throw new NotFoundError(`Tidak ada pelanggan dengan id :  ${id}`);

  await result.deleteOne({ _id: id });

  return result;
};

const checkingPelanggan = async (id) => {
  const result = await Pelanggan.findOne({ _id: id });

  if (!result)
    throw new NotFoundError(`Tidak ada pelanggan dengan id :  ${id}`);

  return result;
};

module.exports = {
  createPelanggan,
  getAllPelanggan,
  getOnePelanggan,
  updatePelanggan,
  deletePelanggan,
  checkingPelanggan,
};
