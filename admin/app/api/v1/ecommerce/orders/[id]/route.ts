import { NextRequest } from "next/server";
export async function GET(req:NextRequest, {params}:{params:{id:string}}) {
  const { id } = params;
  let response = {
    "data": {
      "_id": id,
      "order": {
        "__v": 0,
        "_id": id,
        "address": {
          "__v": 0,
          "_id": "649e7bfcdbf96264731f5738",
          "addressLine1": "758 Antone Trafficway",
          "addressLine2": "Jacobs Spurs",
          "city": "New Magdalenfield",
          "country": "Poland",
          "createdAt": "2023-06-30T06:53:48.726Z",
          "owner": "649e7bfbdbf96264731f544f",
          "pincode": "024061",
          "state": "New Hampshire",
          "updatedAt": "2023-06-30T06:53:48.726Z"
        },
        "coupon": {
          "_id": "649e7bfcdbf96264731f5786",
          "couponCode": "CORRUPTI845",
          "name": "temporibus"
        },
        "createdAt": "2023-06-30T06:53:48.826Z",
        "customer": {
          "_id": "649e7bfbdbf96264731f5455",
          "email": "emilia.hayes70@yahoo.com",
          "username": "emmitt3"
        },
        "discountedOrderPrice": 5411,
        "isPaymentDone": true,
        "items": [
          {
            "_id": "649e7bfcdbf96264731f5a0d",
            "product": {
              "__v": 0,
              "_id": "649e7bfcdbf96264731f57c8",
              "category": "649e7bfcdbf96264731f56e1",
              "createdAt": "2023-06-30T06:53:48.766Z",
              "description": "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
              "mainImage": {
                "_id": "649e7bfcdbf96264731f57c9",
                "localPath": "",
                "url": "https://loremflickr.com/640/480/product?lock=7464317817454592"
              },
              "name": "Recycled Granite Bacon",
              "owner": "649e7bfbdbf96264731f543d",
              "price": 426,
              "mrp" : 234,
              "stock": 47,
              "subImages": [
                {
                  "_id": "649e7bfcdbf96264731f57ca",
                  "localPath": "",
                  "url": "https://loremflickr.com/640/480/product?lock=3434367487574016"
                },
                {
                  "_id": "649e7bfcdbf96264731f57cb",
                  "localPath": "",
                  "url": "https://loremflickr.com/640/480/product?lock=5167427790831616"
                },
                {
                  "_id": "649e7bfcdbf96264731f57cc",
                  "localPath": "",
                  "url": "https://loremflickr.com/640/480/product?lock=3368131338698752"
                },
                {
                  "_id": "649e7bfcdbf96264731f57cd",
                  "localPath": "",
                  "url": "https://loremflickr.com/640/480/product?lock=8845803512659968"
                }
              ],
              "updatedAt": "2023-06-30T06:53:48.766Z"
            },
            "quantity": 5
          },
          {
            "_id": "649e7bfcdbf96264731f5a0d",
            "product": {
              "__v": 0,
              "_id": "649e7bfcdbf96264731f57c8",
              "category": "649e7bfcdbf96264731f56e1",
              "createdAt": "2023-06-30T06:53:48.766Z",
              "description": "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
              "mainImage": {
                "_id": "649e7bfcdbf96264731f57c9",
                "localPath": "",
                "url": "https://loremflickr.com/640/480/product?lock=7464317817454592"
              },
              "name": "Recycled Granite Bacon",
              "owner": "649e7bfbdbf96264731f543d",
              "price": 426,
              "mrp" : 234,
              "stock": 47,
              "subImages": [
                {
                  "_id": "649e7bfcdbf96264731f57ca",
                  "localPath": "",
                  "url": "https://loremflickr.com/640/480/product?lock=3434367487574016"
                },
                {
                  "_id": "649e7bfcdbf96264731f57cb",
                  "localPath": "",
                  "url": "https://loremflickr.com/640/480/product?lock=5167427790831616"
                },
                {
                  "_id": "649e7bfcdbf96264731f57cc",
                  "localPath": "",
                  "url": "https://loremflickr.com/640/480/product?lock=3368131338698752"
                },
                {
                  "_id": "649e7bfcdbf96264731f57cd",
                  "localPath": "",
                  "url": "https://loremflickr.com/640/480/product?lock=8845803512659968"
                }
              ],
              "updatedAt": "2023-06-30T06:53:48.766Z"
            },
            "quantity": 5
          },
        ],
        "orderPrice": 6256,
        "paymentId": "ZMHZzdnZLdoLLrijpXvh6fGX",
        "paymentProvider": "PAYPAL",
        "status": "DELIVERED",
        "updatedAt": "2023-06-30T06:53:48.826Z"
      }
    },
    "message": "Order fetched successfully",
    "statusCode": 200,
    "success": true
  }
  return new Response(JSON.stringify(response), { headers: { 'Content-Type': 'application/json' } });
}