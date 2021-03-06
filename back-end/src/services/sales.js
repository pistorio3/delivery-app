const Sequelize = require('sequelize');

const { Sale, SalesProduct } = require('../database/models');

const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const addNewSale = async (objeto) => {
    const t = await sequelize.transaction();
    try {
        const { objSale, objSaleProduct, id } = objeto;
        const sale = await Sale
            .create({ userId: id, ...objSale, saleDate: Date.now(), status: 'Pendente' });
        const promises = objSaleProduct.map(async (p) => {
            const result = await SalesProduct
            .create({ saleId: sale.id, productId: p.id, quantity: p.quantity });
            return result;
         });
        Promise.all(promises).then((response) => console.log(response));
        await t.commit();
        return sale;
    } catch (e) {
        await t.rollback();
        console.log('Erro aqui', e.message);
    }
};

const getAllSales = async () => {
    const sales = await Sale.findAll();

    return sales;
};

const updateSaleStatus = async ({ status, id }) => {
    if (!status || !id) {
        return null;
    }
    try {
  await Sale.update({ status }, { where: { id } });
  const result = await Sale.findOne({ where: { id } });
  return result.dataValues.status;
} catch (e) {
     console.log('error Sales.js');
  }
};

module.exports = {
    addNewSale,
    getAllSales,
    updateSaleStatus,
};
