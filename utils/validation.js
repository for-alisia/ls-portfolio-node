module.exports = (fields, files) => {
  if (files.photo.name === '' || files.photo.size === 0) {
    return { status: 'Не загружено изображение товара', err: true };
  }
  if (!fields.name) {
    return { status: 'Не указано наименование товара', err: true };
  }
  if (!fields.price) {
    return { status: 'Не указана цена товара', err: true };
  }
  return { status: 'Ok', err: false };
};
