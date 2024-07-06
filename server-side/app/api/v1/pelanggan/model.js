const mongoose = require('mongoose');

let pelangganSchema = new mongoose.Schema(
  {
    id_pelanggan: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Nama harus diisi'],
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email harus diisi'],
      minlength: 3,
      maxlength: 30,
    },
    tarifID: {
      type: mongoose.Types.ObjectId,
      ref: 'Tarif',
      required: true,
    },
    alamat: {
      type: String,
      required: [true, 'Alamat harus diisi'],
    },
    avatar: {
      type: String,
      default: function () {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(
          this.name
        )}&background=random`;
      },
    },
    no_telp: {
      type: String,
      unique: true,
      required: [true, 'Nomor Telepon harus diisi'],
      maxlength: 13,
    },
    role: {
      type: String,
      default: 'pelanggan',
      required: [true, 'Role harus diisi'],
    },
  },
  { timestamps: true }
);

pelangganSchema.pre('save', async function (next) {
  const Pelanggan = this;

  if (Pelanggan.isNew) {
    const year = new Date().getFullYear().toString().slice(-2);
    const prefix = 'PL';

    try {
      const count = await mongoose.model('Pelanggan').countDocuments();
      const sequentialNumber = (count + 1).toString().padStart(3, '0');

      Pelanggan.id_pelanggan = `${prefix}${year}${sequentialNumber}`;
    } catch (error) {
      return next(error);
    }
  }

  next();
});

module.exports = mongoose.model('Pelanggan', pelangganSchema);
