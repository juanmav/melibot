const test = require('tape');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

const getMessage = require('../getmessage')(db);

test('Test get message question', function (t) {

    let notificationAggregated ={
        "topic": "questions",
        "nickname": "SPORTS-XTREME",
        "user_id": 105826,
        "resource": {
            "id": 6259841065,
            "seller_id": 105826,
            "text": "Se los puede armar a gusto? O tienene que ser todos iguales",
            "status": "UNANSWERED",
            "item_id": "MLA757948861",
            "date_created": "2019-04-30T11:33:12.000-04:00",
            "hold": false,
            "deleted_from_listing": false,
            "answer": null,
            "from": {
                "id": 68879850,
                "answered_questions": 1
            }
        },
        "notificationRequest": {
            "resource": "/questions/6259841065",
            "user_id": "105826",
            "topic": "questions",
            "application_id": 7613814812044849,
            "attempts": 1,
            "sent": "2019-04-30T15:33:13.569Z",
            "received": "2019-04-30T15:33:13.551Z"
        }
    };


    let result = getMessage(notificationAggregated);
    console.log(result);
    t.ok(result);
    t.end();
});

test.skip('Test get message message', function (t) {
    let notificationAggregated = {
        "topic": "messages",
        "nickname": "ATHLET.IO",
        "user_id": 7780806,
        "resource": {
            "message_id": "59caf2ac551047d4b65d568e7ce42ec8",
            "date_received": "2019-04-30T23:58:09.693Z",
            "date": "2019-04-30T23:58:09.693Z",
            "date_available": "2019-04-30T23:58:09.693Z",
            "date_notified": "2019-05-01T00:53:17.866Z",
            "date_read": null,
            "from": {
                "user_id": "196704702",
                "email": "tuckyr.1ghsp4+2-oge4tsnrrg44toobx@mail.mercadolibre.com",
                "name": "Nestor"
            },
            "to": [
                {
                    "user_id": "7780806",
                    "email": "jvicent.rkxftk+2-oge4tsnrrg44toobx@mail.mercadolibre.com"
                }
            ],
            "subject": "Clif Shot - Gel - Sponsor Oficial Ironman - Chocolate",
            "text": {
                "plain": "Todo perfecto, muchas gracias."
            },
            "attachments": [],
            "attachments_validations": {
                "invalid_size": [],
                "invalid_extension": [],
                "forbidden": [],
                "internal_error": []
            },
            "site_id": "MLA",
            "resource": "orders",
            "resource_id": "1996179751",
            "status": "available",
            "moderation": {
                "status": "clean",
                "date_moderated": "2019-04-30T23:58:09.740Z",
                "source": "online"
            }
        },
        "notificationRequest": {
            "resource": "59caf2ac551047d4b65d568e7ce42ec8",
            "user_id": "7780806",
            "topic": "messages",
            "application_id": 7613814812044849,
            "attempts": 1,
            "sent": "2019-05-01T13:23:39.237Z",
            "received": "2019-05-01T13:23:39.211Z"
        }
    };

    let result = getMessage(notificationAggregated);
    console.log(result);
    t.ok(result);
    t.end();

});

test.skip('Test get message orders only once', function(t){

    let notificationAggregated = {
        "topic": "orders",
        "nickname": "ATHLET.IO",
        "user_id": 7780806,
        "resource": {
            "id": 1996179751,
            "date_created": "2019-04-23T12:35:49.000-04:00",
            "date_closed": "2019-04-23T12:35:52.000-04:00",
            "last_updated": "2019-04-23T12:35:52.000-04:00",
            "manufacturing_ending_date": null,
            "feedback": {
                "sale": null,
                "purchase": null
            },
            "mediations": [],
            "comments": null,
            "pack_id": null,
            "pickup_id": null,
            "order_request": {
                "return": null,
                "change": null
            },
            "fulfilled": null,
            "total_amount": 1800,
            "total_amount_with_shipping": 2079.99,
            "paid_amount": 2079.99,
            "coupon": {
                "id": null,
                "amount": 0
            },
            "expiration_date": "2019-05-21T12:35:52.000-04:00",
            "order_items": [
                {
                    "item": {
                        "id": "MLA776772346",
                        "title": "Clif Shot - Gel - Sponsor Oficial Ironman - Chocolate",
                        "category_id": "MLA3733",
                        "variation_id": 34241350224,
                        "seller_custom_field": null,
                        "variation_attributes": [
                            {
                                "id": "FLAVOR",
                                "name": "Sabor",
                                "value_id": "2517712",
                                "value_name": "Chocolate"
                            }
                        ],
                        "warranty": "CLIF",
                        "condition": "new",
                        "seller_sku": null
                    },
                    "quantity": 15,
                    "unit_price": 120,
                    "full_unit_price": 120,
                    "currency_id": "ARS",
                    "manufacturing_days": null
                }
            ],
            "currency_id": "ARS",
            "payments": [
                {
                    "id": 4703530855,
                    "order_id": 1996179751,
                    "payer_id": 196704702,
                    "collector": {
                        "id": 7780806
                    },
                    "card_id": 323708538,
                    "site_id": "MLA",
                    "reason": "Clif Shot - Gel - Sponsor Oficial Ironman - Chocolate",
                    "payment_method_id": "master",
                    "currency_id": "ARS",
                    "installments": 1,
                    "issuer_id": "3",
                    "atm_transfer_reference": {
                        "company_id": null,
                        "transaction_id": "989655280799960"
                    },
                    "coupon_id": null,
                    "activation_uri": null,
                    "operation_type": "regular_payment",
                    "payment_type": "credit_card",
                    "available_actions": [
                        "refund"
                    ],
                    "status": "approved",
                    "status_code": null,
                    "status_detail": "accredited",
                    "transaction_amount": 1800,
                    "taxes_amount": 0,
                    "shipping_cost": 279.99,
                    "coupon_amount": 0,
                    "overpaid_amount": 0,
                    "total_paid_amount": 2079.99,
                    "installment_amount": 2079.99,
                    "deferred_period": null,
                    "date_approved": "2019-04-23T12:35:52.000-04:00",
                    "authorization_code": "686364",
                    "transaction_order_id": null,
                    "date_created": "2019-04-23T12:35:49.000-04:00",
                    "date_last_modified": "2019-04-23T12:35:52.000-04:00"
                }
            ],
            "shipping": {
                "id": 27945823016,
                "site_id": "MLA",
                "shipment_type": "shipping",
                "mode": "me2",
                "shipping_mode": "me2",
                "status": "pending",
                "substatus": null,
                "date_created": "2019-04-23T12:35:49.000-04:00",
                "receiver_address": {
                    "id": null,
                    "address_line": "Av. Santa Fe 3882",
                    "street_name": "Av. Santa Fe",
                    "street_number": "3882",
                    "comment": null,
                    "zip_code": "1425",
                    "city": {
                        "id": null,
                        "name": "CABA"
                    },
                    "state": {
                        "id": "AR-C",
                        "name": "Capital Federal"
                    },
                    "country": {
                        "id": "AR",
                        "name": "Argentina"
                    },
                    "neighborhood": {
                        "id": null,
                        "name": null
                    },
                    "municipality": {
                        "id": null,
                        "name": null
                    },
                    "types": [
                        "agency_address"
                    ],
                    "latitude": -34.58390559,
                    "longitude": -58.4181962,
                    "geolocation_type": null,
                    "agency": {
                        "carrier_id": 17501440,
                        "agency_id": "30025",
                        "description": "Correo Argentino",
                        "phone": "0810-777-7787",
                        "open_hours": "Lunes a viernes de 10 a 18 hs."
                    },
                    "receiver_name": "Néstor Ramos",
                    "receiver_phone": null
                },
                "sender_address": {
                    "id": 206514905,
                    "address_line": "Triunvirato 3613",
                    "street_name": "Triunvirato",
                    "street_number": "3613",
                    "comment": "Referencia KIOSCO",
                    "zip_code": "1427",
                    "city": {
                        "id": null,
                        "name": "Villa Ortúzar"
                    },
                    "state": {
                        "id": "AR-C",
                        "name": "Capital Federal"
                    },
                    "country": {
                        "id": "AR",
                        "name": "Argentina"
                    },
                    "neighborhood": {
                        "id": null,
                        "name": null
                    },
                    "municipality": {
                        "id": null,
                        "name": null
                    },
                    "agency": null,
                    "types": [
                        "billing",
                        "default_selling_address",
                        "shipping"
                    ],
                    "latitude": -34.599028,
                    "longitude": -58.385988,
                    "geolocation_type": "ROOFTOP"
                },
                "currency_id": "ARS",
                "date_first_printed": "2019-04-23T16:47:38.000-04:00",
                "service_id": 431,
                "shipping_items": [
                    {
                        "id": "MLA776772346",
                        "description": "Clif Shot - Gel - Sponsor Oficial Ironman - Chocolate",
                        "quantity": 15,
                        "dimensions": "26.0x26.0x26.0,10305.0",
                        "dimensions_source": {
                            "id": "MLA776772346",
                            "origin": "high_coverage"
                        }
                    }
                ],
                "receiver_id": 196704702,
                "sender_id": 7780806,
                "shipping_option": {
                    "id": 531433632,
                    "shipping_method_id": 503045,
                    "name": "Retiro en Correo Argentino",
                    "currency_id": "ARS",
                    "list_cost": 279.99,
                    "cost": 279.99,
                    "delivery_type": "estimated",
                    "estimated_schedule_limit": {
                        "date": null
                    },
                    "estimated_delivery_time": {
                        "type": "known_frame",
                        "date": "2019-04-26T00:00:00.000-03:00",
                        "unit": "hour",
                        "offset": {
                            "date": "2019-05-02T00:00:00.000-03:00",
                            "shipping": 48
                        },
                        "time_frame": {
                            "from": null,
                            "to": null
                        },
                        "pay_before": null,
                        "shipping": 24,
                        "handling": 48,
                        "schedule": null
                    },
                    "estimated_delivery_limit": {
                        "date": "2019-05-16T00:00:00.000-03:00",
                        "offset": 240
                    },
                    "estimated_delivery_final": {
                        "date": "2019-08-29T00:00:00.000-03:00",
                        "offset": 1920
                    },
                    "estimated_delivery_extended": {
                        "date": "2019-05-07T00:00:00.000-03:00",
                        "offset": 72
                    },
                    "estimated_handling_limit": {
                        "date": "2019-04-25T00:00:00.000-03:00"
                    }
                },
                "logistic_type": "drop_off",
                "picking_type": null,
                "cost_components": {
                    "special_discount": 0,
                    "loyal_discount": 0,
                    "compensation": 0,
                    "gap_discount": 0,
                    "ratio": 0
                },
                "cost": 279.99
            },
            "status": "paid",
            "status_detail": null,
            "tags": [
                "delivered",
                "paid"
            ],
            "buyer": {
                "id": 196704702,
                "nickname": "TUCKYRAMOS",
                "email": "tuckyr.1ghsp4+2-oge4tsnrrg44toobx@mail.mercadolibre.com",
                "phone": {
                    "area_code": null,
                    "extension": "",
                    "number": null,
                    "verified": false
                },
                "alternative_phone": {
                    "area_code": "",
                    "extension": "",
                    "number": ""
                },
                "first_name": "Nestor",
                "last_name": "Ramos",
                "billing_info": {
                    "doc_type": "DNI",
                    "doc_number": "20737302"
                }
            },
            "seller": {
                "id": 7780806,
                "nickname": "ATHLET.IO",
                "email": "jvicent.rkxftk+2-oge4tsnrrg44toobx@mail.mercadolibre.com",
                "phone": {
                    "area_code": "011",
                    "extension": "",
                    "number": "1560432525",
                    "verified": false
                },
                "alternative_phone": {
                    "area_code": "",
                    "extension": "",
                    "number": ""
                },
                "first_name": "Juan Manuel",
                "last_name": "Vicente"
            },
            "taxes": {
                "amount": null,
                "currency_id": null
            }
        },
        "notificationRequest": {
            "resource": "/orders/1996179751",
            "user_id": 7780806,
            "topic": "orders",
            "application_id": 7613814812044849,
            "attempts": 1,
            "sent": "2019-04-30T20:17:40.849Z",
            "received": "2019-04-30T20:17:40.826Z"
        }
    };

    let result = getMessage(notificationAggregated);
    console.log(result);
    t.ok(result);

    let result2 = getMessage(notificationAggregated);

    t.false(result2);

    // Clean up
    db.get('orders')
        .remove({id: notificationAggregated.resource.id})
        .write();


    t.end();

});