const mongoose = require('mongoose');

let tarifSchema = new mongoose.Schema(
  {
    id_tarif: {
      type: String,
      unique: true,
    },
    harga_tarif: {
      type: Number,
      required: [true, 'Harga tarif harus diisi'],
      default: 0,
    },
    daya_listrik: {
      type: String,
      required: [true, 'Daya listrik harus diisi'],
    },
  },
  { timestamps: true }
);

tarifSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const yearSuffix = new Date().getFullYear().toString().slice(-2);
      const lastTarif = await this.constructor
        .findOne()
        .sort({ createdAt: -1 })
        .exec();
      let sequenceNumber = '001';

      if (lastTarif) {
        const lastIdTarif = lastTarif.id_tarif;
        const lastSequence = parseInt(lastIdTarif.slice(-3), 10);
        sequenceNumber = (lastSequence + 1).toString().padStart(3, '0');
      }

      this.id_tarif = `TF${yearSuffix}${sequenceNumber}`;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model('Tarif', tarifSchema);
