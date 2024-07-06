// kegiatan
const TarifListrik = require('../../api/v1/tarifListrik/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const createTarif = async (req, res) => {
  const { harga_tarif, daya_listrik } = req.body;

  if (!harga_tarif && !daya_listrik) {
    alert('Harga tarif harus diisi');
    throw new BadRequestError('Harga tarif harus diisi');
  }

  const result = await TarifListrik.create({
    harga_tarif,
    daya_listrik,
  });

  return result;
};

const getAllTarif = async (req) => {
  const result = await TarifListrik.find();

  return result;
};

const getOneTarif = async (req) => {
  const { id } = req.params;

  const result = await TarifListrik.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada tarif dengan id :  ${id}`);

  return result;
};

const updateTarif = async (req) => {
  const { id } = req.params;
  const { harga_tarif, daya_listrik } = req.body;

  const check = await TarifListrik.findOne({
    harga_tarif,
    daya_listrik,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError('Tarif sudah terdaftar');

  const result = await TarifListrik.findOneAndUpdate(
    { _id: id },
    {
      harga_tarif,
      daya_listrik,
    },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`Tarif dengan id :  ${id}`);

  return result;
};

const deleteTarif = async (req) => {
  const { id } = req.params;

  const result = await TarifListrik.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada tarif dengan id :  ${id}`);

  await result.deleteOne({ _id: id });

  return result;
};

const checkingTarif = async (id) => {
  const result = await TarifListrik.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada tarif dengan id :  ${id}`);

  return result;
};

module.exports = {
  createTarif,
  getAllTarif,
  getOneTarif,
  updateTarif,
  deleteTarif,
  checkingTarif,
};
