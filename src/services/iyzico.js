//iyzico api
const Iyzipay = require('iyzipay');

const iyzipay = new Iyzipay({
    apiKey: 'sandbox-P3VM53sr6eE8mBJQ6KI0J1YhDQtMyvTM',
    secretKey: 'sandbox-5POASxwuWPNHlphJWOhNVKa6Dt80NKZt',
    uri: 'https://sandbox-api.iyzipay.com'
})


//iyzico api

const makePayment = (price, user) => {
    return new Promise((resolve, reject) => {

        const request = {
            locale: Iyzipay.LOCALE.TR,
            conversationId: '123456789',
            price: price,
            paidPrice: price,
            currency: Iyzipay.CURRENCY.TRY,
            installment: '1',
            basketId: 'B67832',
            paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
            paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
            paymentCard: {
                cardHolderName: user.cardHolderName,
                cardNumber: user.cardNumber,
                expireMonth: user.cardExpirationMonth,
                expireYear: user.cardExpirationYear,
                cvc: user.cardCVC,
                registerCard: '0'
            },
            buyer: {
                id: 'BY789',
                name: user.firstName,
                surname: user.lastName,
                gsmNumber: '+905350000000',
                email: 'email@email.com',
                identityNumber: '74300864791',
                lastLoginDate: '2015-10-05 12:43:35',
                registrationDate: '2013-04-21 15:12:09',
                registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                ip: '85.34.78.112',
                city: 'Istanbul',
                country: 'Turkey',
                zipCode: '34732'
            },
            shippingAddress: {
                contactName: user.cardHolderName,
                city: 'Istanbul',
                country: 'Turkey',
                address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                zipCode: '34742'
            },
            billingAddress: {
                contactName: user.cardHolderName,
                city: 'Istanbul',
                country: 'Turkey',
                address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                zipCode: '34742'
            },
            basketItems: [{
                id: 'BI101',
                name: 'Binocular',
                category1: 'Collectibles',
                category2: 'Accessories',
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: price
            }]
        };

        iyzipay.payment.create(request, function(err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });

        console.log('PAYMENT END!!');
    });
}

module.exports = makePayment;