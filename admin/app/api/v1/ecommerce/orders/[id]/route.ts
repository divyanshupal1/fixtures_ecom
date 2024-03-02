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
            "_id": "649e7bfcdbf96264731f5a0e",
            "product": {
              "__v": 0,
              "_id": "649e7bfcdbf96264731f57ce",
              "category": "649e7bfcdbf96264731f56df",
              "createdAt": "2023-06-30T06:53:48.766Z",
              "description": "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
              "mainImage": {
                "_id": "649e7bfcdbf96264731f57cf",
                "localPath": "",
                "url": "https://loremflickr.com/640/480/product?lock=7975801114853376"
              },
              "name": "Luxurious Granite Keyboard",
              "owner": "649e7bfbdbf96264731f541c",
              "price": 294,
              "stock": 172,
              "subImages": [
                {
                  "_id": "649e7bfcdbf96264731f57d0",
                  "localPath": "",
                  "url": "https://loremflickr.com/640/480/product?lock=244044475138048"
                },
                {
                  "_id": "649e7bfcdbf96264731f57d1",
                  "localPath": "",
                  "url": "https://loremflickr.com/640/480/product?lock=5204794522206208"
                },
                {
                  "_id": "649e7bfcdbf96264731f57d2",
                  "localPath": "",
                  "url": "https://loremflickr.com/640/480/product?lock=4480031344558080"
                },
                {
                  "_id": "649e7bfcdbf96264731f57d3",
                  "localPath": "",
                  "url": "https://loremflickr.com/640/480/product?lock=4034762618437632"
                }
              ],
              "updatedAt": "2023-06-30T06:53:48.766Z"
            },
            "quantity": 5
          },
          {
            "_id": "649e7bfcdbf96264731f5a0f",
            "product": {
              "__v": 0,
              "_id": "649e7bfcdbf96264731f57d4",
              "category": "649e7bfcdbf96264731f56dc",
              "createdAt": "2023-06-30T06:53:48.766Z",
              "description": "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
              "mainImage": {
                "_id": "649e7bfcdbf96264731f57d5",
                "localPath": "",
                "url": "https://loremflickr.com/640/480/product?lock=5516794521452544"
              },
              "name": "Unbranded Frozen Bike",
              "owner": "649e7bfbdbf96264731f5455",
              "price": 362,
              "stock": 65,
              "subImages": [
                {
                  "_id": "649e7bfcdbf96264731f57d6",
                  "localPath": "",
                  "url": "https://loremflickr.com/640/480/product?lock=4062546218713088"
                },
                {
                  "_id": "649e7bfcdbf96264731f57d7",
                  "localPath": "",
                  "url": "https://loremflickr.com/640/480/product?lock=7391130201096192"
                },
                {
                  "_id": "649e7bfcdbf96264731f57d8",
                  "localPath": "",
                  "url": "https://loremflickr.com/640/480/product?lock=120893598597120"
                },
                {
                  "_id": "649e7bfcdbf96264731f57d9",
                  "localPath": "",
                  "url": "https://loremflickr.com/640/480/product?lock=4198532235919360"
                }
              ],
              "updatedAt": "2023-06-30T06:53:48.766Z"
            },
            "quantity": 5
          },
          {
            "_id": "649e7bfcdbf96264731f5a10",
            "product": {
              "__v": 0,
              "_id": "649e7bfcdbf96264731f57da",
              "category": "649e7bfcdbf96264731f56d6",
              "createdAt": "2023-06-30T06:53:48.767Z",
              "description": "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
              "mainImage": {
                "_id": "649e7bfcdbf96264731f57db",
                "localPath": "",
                "url": "https://loremflickr.com/640/480/product?lock=3298074176782336"
              },
              "name": "Unbranded Bronze Bacon",
              "owner": "649e7bfbdbf96264731f545e",
              "price": 423,
              "stock": 74,
              "subImages": [
                {
                  "_id": "649e7bfcdbf96264731f57dc",
                  "localPath": "",
                  "url": "https://loremflickr.com/640/480/product?lock=3431786591813632"
                },
                {
                  "_id": "649e7bfcdbf96264731f57dd",
                  "localPath": "",
                  "url": "https://loremflickr.com/640/480/product?lock=6701548415483904"
                },
                {
                  "_id": "649e7bfcdbf96264731f57de",
                  "localPath": "",
                  "url": "https://loremflickr.com/640/480/product?lock=7102421234876416"
                },
                {
                  "_id": "649e7bfcdbf96264731f57df",
                  "localPath": "",
                  "url": "https://loremflickr.com/640/480/product?lock=4356734367825920"
                }
              ],
              "updatedAt": "2023-06-30T06:53:48.767Z"
            },
            "quantity": 2
          }
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