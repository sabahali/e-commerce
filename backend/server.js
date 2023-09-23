const express = require('express')
const app = express();
const cors = require('cors')
const Router = require('router')
const connect = require('./mongodbControllers/mongodb')
const { userModel, orderModel } = require('./mongodbControllers/models')
const jwtVerify = require('./middlewares/jwtverify')
const cookieParser = require('cookie-parser')
const axios = require('axios')

const credentials = require('./middlewares/credentials')
const stripe = require('stripe')('sk_test_51NM31RSHQMvGYYZ8dNLOTcGX4FeijT9GnPji7VcKSZ45lPpXPXl1y0dYFYxYxYw2FlQB5NmuwwsT0E7io3kiglRU00ZdqqrTyH');

connect(() => {
    app.listen(8000, () => {
        console.log("server connected to port 8000")
    })
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
const corsOptions = {
    origin: true,
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(credentials)
app.use(cors(corsOptions))

app.use('/register', require('./controllers/registerController'))
app.use('/login', require('./controllers/loginController'))

app.use('/refresh', require('./controllers/refreshController'))
app.use('/logout', require('./api/logout'))


app.use(jwtVerify)
app.post('/getProducts', async (req, res) => {
    const { offset } = req.body
    const response = await axios.get(`https://dummyjson.com/products?limit=10&skip=${offset}`)
    res.send(response.data)
    // res.sendStatus(200)
})
// app.get('/getAllProducts', async (req, res) => {
//     const { offset } = req.body
//     const response = await axios.get('https://dummyjson.com/products/?limit=200')
//     console.log(response.status)
//     console.log('getAllProducts')
//     res.send(response.data)
//     // res.sendStatus(200)
// })
app.post('/getByCategories', async (req, res) => {
    const offset = 0;
    const { category } = req.body
    console.log(req.body)
    const response = await axios.get(`https://dummyjson.com/products/category/${category}?limit=0&skip=${offset}`)
    res.send(response.data)
    // res.sendStatus(200)
})
app.post('/getProductById', async (req, res) => {
    const { id } = req.body
    console.log(req.body)
    const response = await axios.get(`https://dummyjson.com/products/${id}`)
    res.send(response.data)
    // res.sendStatus(200)
})

app.post('/test', (req, res) => {
    console.log(req.body)
    console.log('test')
    res.json('testWorked').status(200)
})

const success = 'http://localhost:3000/home/paymentsuccess'
const fail = 'http://localhost:3000/home/paymentfailed'

app.post('/create-checkout-session', async (req, res) => {
    // console.log(req.body)



    const found = req.body.find(item => item.email)
    let customer_email;
    if (found?.email) {
        customer_email = found.email;
    } else {
        customer_email = 'guest@gmail.com'
    }
    const line_items = req.body.map((item) => {
        return {
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.title,

                },
                unit_amount: item.price * 100
            },
            quantity: item.count
        }
    })
    // console.log(line_items)
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            billing_address_collection: 'required',

            customer_email: customer_email,
            success_url: `${success}?success=true`,
            cancel_url: `${fail}?canceled=true`,
            phone_number_collection: { enabled: true },
            // billing_address_collection :required,
            shipping_address_collection: {
                allowed_countries: ['IN']
            }
        });
        console.log(session)
        res.json({ id: session.id })



    } catch (err) {
        console.log(err.message)
    }



});

app.get('/getallusers', async (req, res) => {
    const users = await userModel.find()
    // console.log(users)
    res.send(users)

});
app.post('/updateRole', async (req, res) => {
    console.log(req.body)
    if (req.body.id == '650dbef5fb1f4776ca9b58f4') {
        res.sendStatus(405)
        console.log('Not allowed')
        return
    } else {
        const filter = { _id: req.body.id }
        const update = { role: req.body.role }
        const opt = { new: true, upsert: true }
        const response = await userModel.findOneAndUpdate(filter, update, opt);
        // console.log(response)
        if (response) {
            res.sendStatus(200)
        } else {
            res.sendStatus(500)
        }
    }

});

app.post('/deleteUser', async (req, res) => {
    if (req.body.id == '650dbef5fb1f4776ca9b58f4') {
        res.sendStatus(405)
        return
    } else {
        console.log(req.body);
        const response = await userModel.findByIdAndDelete(req.body.id)
        if (response) {
            res.sendStatus(200)
        } else {
            res.sendStatus(500)
        }
    }
})

app.post('/addOrdertodb', async (req, res) => {
    const found = req.body.find((item) => item);
    const email = found.email;
    const response = await orderModel.insertMany({ order: req.body, email: email });
    if (response) {
        res.sendStatus(201)
    }

});

app.post('/getOrdersfromDb', async (req, res) => {
    const { email } = req.body;
    console.log(email)
    const response = await orderModel.find({ email: email }, { order: 1, _id: 0 })

    if (response) {

        const flatArray = [].concat(...response.map(item => item.order));
        console.log(flatArray);
        res.send(flatArray)
    } else {
        res.sendStatus(500)
    }
})